from flask import request, jsonify
from flask_restx import Resource, Api, Namespace, fields
import json
from flask import make_response

from QuantStrategy.QuantSelecter import QuantSelecter


Quant = Namespace(
    name="Quant",
    description="Algoridang service Quant API",
)


quantListFields = Quant.model('quantListFields', {  # Model 객체 생성
})

expQuantList = {"0": "초기설정", "1": "사용자 전략 설정", "2": "신마법공식 1.0"}
quantListResponses = Quant.inherit('QuantResponses', quantListFields, {
    'strategy': fields.String(description='strategy code list', required=False, example=expQuantList),
})

@Quant.route('/lookup')
@Quant.doc(params={})
class QuantList(Resource):
    @Quant.expect(quantListFields)
    @Quant.response(201, 'Success', quantListResponses)
    def get(self): 
        """ Quant 전략 리스트를 조회합니다. """
        quant = QuantSelecter()
        
        res = quant.getQuantList()

        result = json.dumps(res, ensure_ascii=False)
        res = make_response(result)
        return res



expQuantParm={
        "strategy" : 1,
        "numberOfData" : 5,
        "data" : {
            "market_cap" : {
                "operater" : "up",
                "values" : [5000]
                } ,
            "revenue" : {
                "operater" : "down",
                "values" : [5000]
                } ,
            "operating_income" : {
                "operater" : "between",
                "values" : [5000, 6000]
                } ,
            "EPS" : 0 ,
            "PER" : 0 ,
            "EV_per_EBITDA" : 0 ,
            "ROE" : 0 ,
            "dividend_yield" : 0 ,
            "BETA" : 0 ,
            "revenue_Q" : 0 ,
            "operating_income_Q" : 0 ,
            "net_income_Q" : 0 ,
            "controlling_interest_Q" : 0 ,
            "non_controlling_interest_Q" : 0 ,
            "total_assets_Q" : 0 ,
            "total_stock_holders_Q" : 0 ,
            "controlling_interest_share_Q" : 0 ,
            "non_controlling_interest_share_Q" : 0 ,
            "capital_Q" : 0 ,
            "debt_ratio_Q" : 0 ,
            "retention_rate_Q" : 0 ,
            "operating_margin_Q" : 0 ,
            "controlling_interest_rate_Q" : 0 ,
            "ROA_Q" : 0 ,
            "ROE_Q" : 0 ,
            "EPS_Q" : 0 ,
            "BPS_Q" : 0 ,
            "DPS_Q" : 0 ,
            "PBR_Q" : 0 ,
            "outstanding_shares_Q" : 0 ,
            "dividend_yield__Q" : 0 
            }
        }


quantStrategyFields = Quant.model('quantStrategyFields', {  # Model 객체 생성
    'parm': fields.String(description='Quant parm', required=True, example=expQuantParm),
})
expQuantStrategyResponses = {"0": ["003030", "세아제강지주"], "1": ["003240", "태광산업"], "2": ["007690", "국도화학"]}
quantStrategyResponses = Quant.inherit('QuantStrategyResponses',{
    'res': fields.String(description='QuantStrategyResponses', required=False, example=expQuantStrategyResponses),
})

@Quant.route('/')
@Quant.doc(params={})
class QuantStrategy(Resource):
    @Quant.expect(quantStrategyFields)
    @Quant.response(201, 'Success', quantStrategyResponses)
    def post(self): 
        """ Quant 전략에 맞는 결과(ticker, 회사명)를 조회합니다. """
        
        if request.method == 'POST':
            data = request.get_json(silent=True)
            
            
            quant = QuantSelecter()
            res = quant.runQuantStrategty(data)

            result = json.dumps(res, ensure_ascii=False)
            res = make_response(result)
        return res



quantSampleFields = Quant.model('quantSampleFields', {  # Model 객체 생성
    'index': fields.String(description='index', required=True, example=1),
})
expQuantSampleResponses = {'strategy': 2, 'numberOfData': 50, 'data': {'market_cap': {'operater': 'up', 'values': [5000]}, 'PBR_Q': {'operater': 'up', 'values': [0]}}}
quantSampleResponses = Quant.inherit('quantSampleResponses',{
    'sample parmeter json format': fields.String(description='quantSampleResponses', required=False, example=expQuantSampleResponses),
})


@Quant.route('/sample')
@Quant.doc(params={})
class QuantStrategy(Resource):
    @Quant.expect(quantSampleFields)
    @Quant.response(201, 'Success', quantSampleResponses)
    def get(self): 
        """ 전략별 전송 파라미터 예시를 조회합니다. """
        
        if request.method == 'GET':
            index= request.args.get('index')
            index = int (index)

            quant = QuantSelecter()
            res = quant.getSampleData(index)

            result = json.dumps(res, ensure_ascii=False)
            res = make_response(result)
        return res
