from flask import Flask, Response, render_template, stream_with_context, request, session, redirect, url_for
import requests
import json
import threading
from queue import Queue, Empty

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/variant', methods=['GET', 'POST'])
def variant():
    if request.method == 'POST':
        variant = request.form.get('variant')
        #apis = request.form.get('apis')
        apis = request.form.getlist('apis')  # 체크박스에서 선택된 API 리스트
        apis_str = ','.join(apis)  # 스트림 엔드포인트로 전달하기 위해 콤마로 구분된 문자열로 변환
        return render_template('variant.html', variant=variant, apis=apis_str)
    else:
        return render_template('variant_form.html')

@app.route('/stream')
def stream():
    def event_stream(variant, apis, session_data):
        host = 'http://143.248.23.236:4042/'
        routes = apis.split(',')
        result_queue = Queue()

        def fetch_api(route):
            data = {"seq": variant, "session_data": session_data}
            # 특별한 옵션 처리
            if route == 'asoamenable':
                options = request.args.get('options')
                if options:
                    for option in [opt for opt in options.split(',') if opt != '']:
                        key, value = option.split('=')
                        option_str = key.replace(f"options-{route}-", '') + '-no'
                        data[option_str] = value.lower() != "false"
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
            result_queue.put({'route': route, 'response_data': response_data, "code": response.status_code})

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
    session_data = "kdw59520@kaist.ac.kr"
    return Response(stream_with_context(event_stream(variant, apis, session_data)), mimetype="text/event-stream")

if __name__ == '__main__':
    app.run(debug=True)
