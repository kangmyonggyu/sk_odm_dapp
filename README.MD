# Dapp API List

ODM Bidding Dapp에서 구현한 API list는 다음과 같습니다.

## 1. /api/contract/config
`API 설명`<br>
config 정보를 가져오는 API

###   - method 
`GET`

## 2. /api/contract/save_tx
`API 설명`<br>
발생한 transaction을 RDS DB에 저장하는 API

###   - method 
`POST`

## 3. /api/contract/get_tx
`API 설명`<br>
발생한 transaction 정보를 RDS DB에서 가져오는 API

###   - method 
`POST`

## 4. /api/contract/save_winner
`API 설명`<br>
입찰에서 선정된 업체의 정보를 저장하는 API

###   - method 
`POST`
