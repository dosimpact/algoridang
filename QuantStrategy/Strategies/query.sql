update member_strategy set  state_code = 'Success', state_info = 'Success' where strategy_code = 1;




select u.strategy_code,u.ticker, u.trading_strategy_name ,u.setting_json from universal u where u.strategy_code = 1;


select * from member_strategy ;

--모의투자 확인용
select * from member_strategy where operation_yes_no = true ;

--기본 투자 설정 여부 확인용
select invest_start_date, invest_principal, strategy_code, securities_corp_fee, invest_end_date from invest_profit_info where  strategy_code = 2707

-- 유니버셜확인용
select * from universal u where u.strategy_code = 2707

--주식 기간 용
select * from daily_stock where ticker ='009440'

--2706,2707 




--QuantNewMagic1_0
--https://everyday-enjoy-mylife.tistory.com/20
select b."ticker" , b."name",b."sum"
from(
	select a."ticker"as "ticker" , a."name"  as "name", a."Rank_PBR_Q" + a."Rank_GPA" as "sum"
	from (
		select  c."ticker"as "ticker" , c."name"  as "name", rank () OVER(order by c."PBR_Q" desc) as "Rank_PBR_Q", rank () over(order by c."GPA" asc) as "Rank_GPA",c."GPA"
		from (
			select cor.ticker as "ticker", cor.corp_name as "name", fin."PBR_Q" as "PBR_Q", fin."operating_income_Q"*10000/fin."total_assets_Q" as "GPA" , fin."operating_income_Q",fin."total_assets_Q"
			from financial_statement fin, corporation cor
			where fin."ticker"=cor."ticker"  
			and fin."PBR_Q" > 0
			and fin."operating_income_Q" >= 0
			and fin."total_assets_Q" > 0
			and fin."market_cap" >= '5000'
		) c
		--order by c."GPA" desc
		
		) a
	) b
order by b."sum" desc
limit 50



--QuantNewMagic2_0
--https://everyday-enjoy-mylife.tistory.com/20
select b."ticker" , b."name",b."sum"
from(
	select a."ticker"as "ticker" , a."name"  as "name", a."Rank_PBR_Q" + a."Rank_GPA" as "sum"
	from (
		select  c."ticker"as "ticker" , c."name"  as "name", rank () OVER(order by c."PBR_Q" desc) as "Rank_PBR_Q", rank () over(order by c."GPA" asc) as "Rank_GPA",c."GPA"
		from (
			select cor.ticker as "ticker", cor.corp_name as "name", fin."PBR_Q" as "PBR_Q", fin."operating_income_Q"*10000/fin."total_assets_Q" as "GPA" , fin."operating_income_Q",fin."total_assets_Q"
			from financial_statement fin, corporation cor
			where fin."ticker"=cor."ticker"  
			and fin."PBR_Q" > 0
			and fin."operating_income_Q" >= 0
			and fin."total_assets_Q" > 0
			and fin."market_cap" >= '5000'
			limit (
				select count(*)  *0.2
				from corporation cort )
		) c
		--order by c."GPA" desc
		
		) a
	) b
order by b."sum" desc
limit 50




select b."ticker" , b."name",b."sum"         
from(            
select a."ticker"as "ticker" , a."name"  as "name", a."RANK_EV_per_EBITDA" + a."RANK_ROE_Q" as "sum"             
from (
select  c."ticker"as "ticker" , c."name"  as "name", rank () OVER(order by c."EV_per_EBITDA" desc) as "RANK_EV_per_EBITDA", rank () over(order by c."ROE_Q" asc) as "RANK_ROE_Q", c."EV_per_EBITDA", c."ROE_Q"  
               
from (                     
select cor.ticker as "ticker", cor.corp_name as "name", fin."EV_per_EBITDA" as "EV_per_EBITDA", fin."ROE_Q" as "ROE_Q"                     
from financial_statement fin, corporation cor                     
where fin."ticker"=cor."ticker"                      
and fin."EV_per_EBITDA" >= 0                     
and fin."ROE_Q" >= 0                     
and fin."market_cap" >= '5000'                                     
) c                 -- order by c."ROE_Q" desc                 -- order by c."EV_per_EBITDA" asc                
 ) a             
 ) b         order by b."sum" desc    
     limit 50


--QuantOriginalMagic
-- EV_per_EBITDA 높을수록 좋음 더 단기에 투자금을 회수할 수 있다는 의미
-- https://m.blog.naver.com/pak6645/221700249642
-- ROE_Q 투자자본을 얼마나 회수하였는가? 1년간
-- https://ko.wikipedia.org/wiki/%EC%9E%90%EA%B8%B0%EC%9E%90%EB%B3%B8%EC%9D%B4%EC%9D%B5%EB%A5%A0

select b."ticker" , b."name",b."sum"
from(
	select a."ticker"as "ticker" , a."name"  as "name", a."RANK_EV_per_EBITDA" + a."RANK_ROE_Q" as "sum"
	from (
		select  c."ticker"as "ticker" , c."name"  as "name", rank () OVER(order by c."EV_per_EBITDA" desc) as "RANK_EV_per_EBITDA", rank () over(order by c."ROE_Q" asc) as "RANK_ROE_Q", c."EV_per_EBITDA", c."ROE_Q"
		from (
			select cor.ticker as "ticker", cor.corp_name as "name", fin."EV_per_EBITDA" as "EV_per_EBITDA", fin."ROE_Q" as "ROE_Q"
			from financial_statement fin, corporation cor
			where fin."ticker"=cor."ticker"  
			and fin."EV_per_EBITDA" >= 0
			and fin."ROE_Q" >= 0
			and fin."market_cap" >= '5000'
			
		) c
		-- order by c."ROE_Q" desc
		-- order by c."EV_per_EBITDA" asc
		) a
	) b
order by b."sum" desc
limit 50

--파마 LSV콤보 전략
-- pcr 이 없음
select cor.ticker as "ticker", cor.corp_name as "name",  fin."market_cap", fin."market_cap", fin."market_cap", fin."market_cap"
from financial_statement fin, corporation cor
where fin."ticker"=cor."ticker"
order by fin."market_cap" asc
limit 500

-- 소형주 저pbr 전략
select a."ticker", a."name"
from (
	select cor.ticker as "ticker", cor.corp_name as "name",  fin."PBR_Q"as "PBR", fin."market_cap"
	from financial_statement fin, corporation cor
	where fin."ticker"=cor."ticker"
	order by fin."market_cap" asc
	limit (
		select count(*)  *0.2
		from corporation cort )
	) a
where a."PBR" >=0.2
order by a."PBR"
limit 30







-- 그레이엄의 마지막 선물
select a."ticker", a."name"
from (
	select cor.ticker as "ticker", cor.corp_name as "name",  fin."PER"as "PER",  fin."debt_ratio_Q"as "debt_ratio_Q"
	from financial_statement fin, corporation cor
	where fin."ticker"=cor."ticker"
	and fin."PER" <= 10
	and fin."debt_ratio_Q" <= 50
	) a
order by a."PER"
limit 30

-- 그레이엄의 마지막 선물 업그레이드
select a."ticker", a."name"
from (
	select cor.ticker as "ticker", cor.corp_name as "name",  fin."ROA_Q"as "ROA_Q",  fin."PBR_Q"as "PBR_Q"
	from financial_statement fin, corporation cor
	where fin."ticker"=cor."ticker"
	and fin."PBR_Q" >= 0.2
	and fin."ROA_Q" >= 5
	and fin."debt_ratio_Q" <= 50
	order by fin."PBR_Q" asc
	) a
limit 30

--NCAV 전략
-- 유동자산 정보가 없음






