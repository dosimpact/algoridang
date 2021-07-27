// (POST) createMyStrategy	Strategy { }
// header : token	MemberStrategy 	(1) 전략 만들기
// (POST) updateMyStrategyById	MemberStrategy { 원금, 수수료 }
// header : token	MemberStrategy 	(2) 나의 전략 업데이트
// (POST) deleteMyStrategyById	id
// header : token	MemberStrategy 	(3) 나의 전략 softdelete
// (POST) recoverStrategyById	id
// header : token	MemberStrategy 	(4) (관리자) 나의 전략 recover
// (POST) noticeMyStrategyById	id
// header : token	MemberStrategy 	(5) 나의 전략 알림기능
// (POST) copyStrategy	id		(1) 투자 전략 복사  ( API )
