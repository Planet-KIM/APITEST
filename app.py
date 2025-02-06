# app.py
from flask import Flask, Response, render_template, stream_with_context, request, session, redirect, url_for
import requests
import json

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/variant', methods=['GET', 'POST'])
def variant():
    if request.method == 'POST':
        variant = request.form.get('variant')
        apis = request.form.get('apis')
        return render_template('variant.html', variant=variant, apis=apis)
    else:
        return render_template('variant_form.html')

@app.route('/stream')
def stream():
    def event_stream(variant, apis, session_data):
        host = 'http://143.248.23.236:4042/'
        routes = apis.split(',')
        for route in routes:
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
            # 클라이언트로 데이터 전송
            yield f"data: {json.dumps({'route': route, 'response': response_data})}\n\n"
    variant = request.args.get('variant')
    apis = request.args.get('apis')
    #session_data = session.get("email", None)
    session_data = "kdw59520@kaist.ac.kr"
    return Response(stream_with_context(event_stream(variant, apis, session_data)), mimetype="text/event-stream")

if __name__ == '__main__':
    session_dattack_after_pasteP1+r = session.get("email", None)
    app.run(debug=True)
