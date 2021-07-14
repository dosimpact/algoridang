## takers pages

layout

- NavBarComponent
- TabNavigation

---

mock-invest

- mock-investC

mock-invest/section

- mock-invest-create
- mock-invest-detail
- mock-invest-list
- mock-invest-update

---

strategy-search

- strategy-searchC

strategy-search/section

- strategy-detail
- strategy-feeeds
- strategy-report
- strategy-types

# 이슈s

## tabs + useHistory

### STAR

S(상황)  
뒤로가기를 누르니 Tab에서 빈칸이 출력된다.!

T(문제)
하나의 url을 공유하는 상황  
해당되는 url 패턴에 맞게 적절한 tab page를 보여줘라.

사용자가 뒤로가기를 눌렀을때, 모의투자 페이지에서 전략탐색 페이지로 이동을 했다면  
이에 맞게 Tab 컴포넌트도 모의 투자 페이지로 이동을 해줘야 한다.

A(행동)

- history.listen 함수를 이용해서 현재의 pathname 을 관찰한다.
- 각 tab에 맞는 pathname 패턴을 만든다.
- 현재의 pathname 과 tab의 패턴이 다르다면 현재의 tab page를 변경한다.

R(결과)

- 페이지 뒤로가기에 대응이 되므로
- 핸드폰에서 백버튼을 눌렀을때 효과를 누릴 수 있다.
