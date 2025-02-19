import requests
import pprint
import concurrent.futures

def fetch_page(base_url, params, page):
    params['page'] = page
    response = requests.get(base_url, params=params)
    response.raise_for_status()
    return response.json()

def search_litvar_all(variant_id):
    """
    NCBI LitVar API를 사용하여 특정 variant_id에 대한 모든 결과를 가져옵니다.

    Parameters:
        variant_id (str): 검색하고자 하는 변이의 ID (예: 'rs121913527')

    Returns:
        list: 모든 결과를 포함하는 리스트
    """
    base_url = 'https://www.ncbi.nlm.nih.gov/research/litvar2-api/search/'
    params = {
        'variant': f'litvar@{variant_id}##',
        'filters': '{}',
        'sort': 'score desc',
        'page': 1,  # 페이지당 최대 결과 수 (API가 허용하는 최대값)
        'page_size': 20
    }

    try:
        # 첫 번째 요청으로 total_pages를 가져옴
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        data = response.json()
        total_pages = data['total_pages']
        facets = data['facets']

        print(f"총 페이지 수: {total_pages}")

        all_results = []

        # ThreadPoolExecutor를 사용하여 여러 페이지를 동시에 요청
        with concurrent.futures.ThreadPoolExecutor(max_workers=total_pages) as executor:
            future_to_page = {executor.submit(fetch_page, base_url, params, page): page for page in range(1, total_pages + 1)}
            for future in concurrent.futures.as_completed(future_to_page):
                page = future_to_page[future]
                try:
                    data = future.result()
                    all_results.extend(data['results'])
                except Exception as exc:
                    print(f"{page} 페이지에서 예외 발생: {exc}")

        #pprint.pprint(facets)
        print(type(all_results))
        if all_results == None:
            raise ValueError("No data in all_results")
        if all_results == []:
            raise ValueError("No data in all_results")
        return all_results, facets

    except requests.exceptions.HTTPError as errh:
        print("HTTP 오류:", errh)
        return [], []
    except requests.exceptions.ConnectionError as errc:
        print("연결 오류:", errc)
        return [], []
    except requests.exceptions.Timeout as errt:
        print("시간 초과 오류:", errt)
        return [], []
    except requests.exceptions.RequestException as err:
        print("요청 오류:", err)
        return [], []
    except ValueError as errv:
        print("ValueError:", errv)
        return [], []


def response2rsid(response_data):
    try:
        each_rsid = ''
        for response_key in response_data.keys():
            each_resource_data = response_data[response_key]
            each_data = each_resource_data[0]
            if len(each_resource_data) == 0:
                raise Exception("No data in response_data")
            ex_variants = each_data['ex_variants'].split("&")
            #print(ex_variants)
            if ((ex_variants[0] == '-') or (ex_variants[0] == '')):
                raise Exception('do not support this type of ex_variants')
            each_rsid = ''
            for item in ex_variants:
                if item.startswith('rs'):
                    each_rsid = item
                    break
            #print(each_rsid)
        return each_rsid
    except Exception as e:
        print(e)
    
def process_litvar(variant, 
                   host='http://143.248.208.160:4042/', 
                   route="parse2mane", 
                   session_data="kdw59520@kaist.ac.kr",
                   headers={"Content-Type": "application/json; charset=UTF-8"}):
    try:    
        data = {"seq": variant, "session_data": session_data}
        response = requests.post(
            url=f'{host}{route}',
            json=data,
            headers=headers)
        response_data = response.json()
        rsid = response2rsid(response_data=response_data)
        results, facets = search_litvar_all(variant_id=rsid)
        if len(results) == 0:
            raise ValueError("No data in results")
        print(f"총 {len(results)}개의 결과를 가져왔습니다.")
        return results, facets
    except Exception as e:
        print(e)
        return {'msg': "no data"}, 404


def fetch_pmc_data(pmc_id, email):
    url = "https://www.ncbi.nlm.nih.gov/pmc/utils/idconv/v1.0/"
    params = {
        "tool": "my_tool",
        "email": email,
        "ids": pmc_id,
        "format": "json"
    }
    
    try:
        response = requests.get(url, params=params, timeout=10)  # 타임아웃 추가
        response.raise_for_status()  # HTTP 에러 발생 시 예외 처리
        
        data = response.json()
        
        if not isinstance(data, dict):
            raise ValueError("Invalid JSON response format")
        
        if data.get("status") != "ok":
            raise ValueError("Invalid response status")
        
        records = data.get("records", [])
        if not isinstance(records, list) or not records:
            raise ValueError("No records found")
        
        pmid = records[0].get("pmid")
        if not isinstance(pmid, str):
            raise ValueError("PMID not found or invalid format")
        
        return pmid
    
    except requests.exceptions.Timeout:
        return {"error": "Request timed out"}
    except requests.exceptions.RequestException as e:
        return {"error": f"Request failed: {e}"}
    except ValueError as e:
        return {"error": str(e)}
    except Exception as e:
        return {"error": f"Unexpected error: {e}"}


def generate_pubmed_link(litvar_data):
    try:
        if type(litvar_data) is not list:
            raise ValueError("Invalid data type")

        for item in litvar_data:
            pmid = item['pmid']
            if '' == item['pmid']:
                continue
            else:
                item['pmid'] = f"<a href='https://pubmed.ncbi.nlm.nih.gov/{pmid}'>{pmid}</a>"
        return litvar_data

    except ValueError as e:
        return {"error": str(e)}