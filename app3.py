from flask import Flask, Response, render_template, stream_with_context, request, session, redirect, url_for
import requests
import json
import os
import threading
from queue import Queue, Empty
import markdown2

app = Flask(__name__)
app.secret_key = 'your_secret_key'

API_LIST =['vep', 'parse2mane', 'split2vcf', 'gnomad', 'topmed', 'spliceai', 'maxentscan',
                               'hexamer', 'labranchor', 'prime5_loc', 'utrannotator', 'litvar','asoamenable']

API_OPTIONS = {
    'asoamenable': [
        {'name': 'clf', 'label': 'Experimental evidence of complete loss of protein-coding function'},
        {'name': 'ssg', 'label': 'Experimental evidence of a splice site gain'}
    ]
}

GIVEN_VARIANTS = ['chr1:925952-925952 G>A', 'ELP1:c.2204+6T>C', 'MFSD8:c.863+4A>G']


# Markdown 파일을 HTML로 변환하는 함수
def get_markdown_content(file_path):
    with open(file_path, 'r') as f:
        markdown_content = f.read()
    return markdown2.markdown(markdown_content)


@app.route('/markdown')
def display_markdown():
    # Markdown 파일 경로
    file_path = './varsome_input_description.md'
    html_content = get_markdown_content(file_path)
    return render_template('display_markdown2.html', content=html_content)

@app.route('/markdown2')
def display_markdown2():
    # Markdown 파일 경로
    file_path = './varsome_input_description.md'
    html_content = get_markdown_content(file_path)
    return render_template('display_markdown2.html', content=html_content)

@app.route('/markdown3')
def display_markdown3():
    # Markdown 파일 경로
    file_path = './varsome_input_description.md'
    html_content = get_markdown_content(file_path)
    return render_template('display_markdown4.html', content=html_content)

@app.route('/markdown4')
def display_markdown4():
    # Markdown 파일 경로
    file_path = './varsome_input_description.md'
    html_content = get_markdown_content(file_path)
    return render_template('display_markdown5.html', content=html_content)

@app.route('/renderdata')
def index():
    # JSON 파일 읽기
    with open('data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    # HTML 렌더링
    return render_template('index.html', data=data)


@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def variant():
    current_path = os.path.dirname(os.path.realpath(__file__))
    api_path = "./api_config.json"
    with open(os.path.join(current_path, api_path)) as api_json_file:
        api_json_content = json.load(api_json_file)
    if request.method == 'POST':
        variant = request.form.get('variant')
        print(f"{variant} variant", variant=="")
        if variant == "":
            return render_template('variant_form3.html', apis=api_json_content, user_variant=GIVEN_VARIANTS)#, api_options=API_OPTIONS)
        apis = request.form.getlist('apis')  # 체크박스에서 선택된 API 리스트
        liftover_option = request.form.get('btncheck_hg19')
        print(variant, apis, liftover_option, liftover_option=='true', request.method)
        if liftover_option != None:
            if liftover_option=='true':
                headers={"Content-Type": "application/json; charset=UTF-8"}
                response_liftover = requests.post(url=f'http://143.248.23.236:4042/service/liftover',
                        json={"seq": variant, "assembly": "hg38"}, headers=headers)
                variant = response_liftover.json()["variantStr"]
        options = []
        # 옵션 처리
        for api in apis:
            if api == 'asoamenable':
                for option in API_OPTIONS[api]:
                    option_name = f"options-{api}-{option['name']}"
                    option_value = request.form.get(option_name, 'true')  # 기본값 'true'
                    options.append(f"{option_name}={option_value}")
            # 다른 API의 옵션 처리 필요 시 여기에 추가

        options_str = ','.join(options) if options else ''
        apis_str = ','.join(apis)  # 스트림 엔드포인트로 전달하기 위해 콤마로 구분된 문자열로 변환
        criteria_file = os.path.join(current_path, './asoamenability.json')
        with open(criteria_file, 'r', encoding='UTF8') as json_file:
            criteria = json.load(json_file)
        return render_template('variant4.html', variant=variant, apis=api_json_content, api_selection=apis_str,
                               options=options_str, criteria=criteria, user_variant=GIVEN_VARIANTS)
    else:
        print(request.args.get('demo'), 'demotest')
        if request.args.get('demo') == 'variant':
            return render_template('variant4.html', apis=api_json_content,
                               user_variant=GIVEN_VARIANTS)
        else:
            return render_template('variant_form3.html', apis=api_json_content, user_variant=GIVEN_VARIANTS)#, api_options=API_OPTIONS)
        #return render_template('variant_form3.html', api_list=API_LIST, api_options=API_OPTIONS)

@app.route('/stream')
def stream():
    def event_stream(variant, apis, options, session_data):
        host = 'http://143.248.23.236:4042/'
        routes = apis.split(',')
        options_list = options.split(',') if options else []
        options_dict = {}
        for option in options_list:
            key_value = option.split('=')
            if len(key_value) == 2:
                options_dict[key_value[0]] = key_value[1].lower() == 'true'
        result_queue = Queue()

        def fetch_api(route):
            data = {"seq": variant, "session_data": session_data}
            # 특별한 옵션 처리
            if route == 'asoamenable':
                for option_key in options_dict:
                    if option_key.startswith(f"options-{route}-"):
                        option_name = option_key.replace(f"options-{route}-", '')
                        data[option_name] = options_dict[option_key]
            print(data)
            if route == 'spliceai':
                data['model_size'] = 5000
                data['model_select'] = 'ensemble'
            try:
                response = requests.post(
                    url=f'{host}{route}',
                    json=data,
                    headers={"Content-Type": "application/json; charset=UTF-8"}
                )
                response_data = response.json()
            except Exception as e:
                response_data = {'error': str(e)}
            # 결과를 큐에 저장
            result_queue.put({'route': route, 'response': response_data})

        # 각 API 호출을 스레드로 실행
        threads = []
        for route in routes:
            thread = threading.Thread(target=fetch_api, args=(route,))
            thread.start()
            threads.append(thread)

        # 결과를 스트리밍
        while True:
            try:
                result = result_queue.get(timeout=0.1)
                # 클라이언트로 데이터 전송
                yield f"data: {json.dumps(result)}\n\n"
            except Empty:
                pass
            # 모든 스레드가 종료되고 큐가 비면 루프 종료
            if all(not t.is_alive() for t in threads) and result_queue.empty():
                break

    variant = request.args.get('variant')
    apis = request.args.get('apis')
    options = request.args.get('options')
    session_data = "kdw59520@kaist.ac.kr"
    return Response(stream_with_context(event_stream(variant, apis, options, session_data)), mimetype="text/event-stream")

if __name__ == '__main__':
    app.run(debug=True, port=8000)
