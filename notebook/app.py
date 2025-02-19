from flask import Flask, render_template, request, jsonify
from variants import Variants
from litvar import process_litvar, generate_pubmed_link

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    seq = request.args.get('seq')
    if seq:
        try:
            # seq 값을 받아 변이 정보를 추출
            
            locStr, ref, alt = Variants(seq).variant2locus()
            variant = f"{locStr} {ref}>{alt}"
            #seq="chr1:925952-925952 G>A"
            #seq="chrX:18609570-18609570 G>A"
            #seq="NM_000368.5(TSC1):c.364-1G>T"
            #seq="chr3:155116987-155116987 G>A" #support to cosv id
            #seq="chr12:25225628-25225628 C>G"
            print("seq:", seq, variant)
            results, extra = process_litvar(variant=variant)
            if extra != 404:
                results = generate_pubmed_link(results)
        except Exception as e:
            results, extra = [], {}
        # 결과가 있을 경우 템플릿에 results, facets 전달
        #return jsonify(results)
        return render_template('litvar.html', results=results, facets=extra)
    # seq 값이 없는 경우 단순 폼만 렌더링
    return render_template('litvar.html')

if __name__ == '__main__':
    app.run(debug=True)