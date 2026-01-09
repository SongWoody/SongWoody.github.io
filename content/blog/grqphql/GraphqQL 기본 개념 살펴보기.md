---
title: GraphQL 기본 개념 살펴보기
date: "2026-01-09T15:53:01.284Z"
description: "GraphQL이 무엇이고 왜 사용하는지, 키마와 타입, 쿼리, 뮤테이션, 리졸버 등을 다루어봅니다."
categories: ["GraphQL"]
tags: ["GraphQL"]
draft: true
---

# 들어가며
> Gatsby 로 블로그를 운영하면서 GraphQL 를 간단하게 다루어보다가 흥미가 생겨서 전체적인 개념에 대해서 공부하게 되었습니다..

# 왜 GraphQL 이 탄생했을까?
> 기존 REST API의 한계: 오버페칭(Over-fetching, 필요한 것보다 많이 받음)과 언더페칭(Under-fetching, 필요한 것보다 적게 받아 여러 번 요청함) 문제를 언급
> GraphQL의 등장: 페이스북이 왜 이 기술을 만들었는지, 그리고 "클라이언트 중심의 쿼리 언어"라는 특징을 가볍게 소개합니다.

# 핵심 개념 알아보기

## 핵심1. 스키마와 타입(The Schema & Types)
> GrahpQL 의 뼈대인 스키마에 대해서 소개
> 데이터의 구조를 정의하는 객체 타입에 대해서 소개(ObjectType, ScalarType)

## 핵심2. 쿼리(Query) - 데이터 읽기
> 클라이언트가 원하는 데이터만 정확히 요청하는 필드 설명
> 인자를 줘 특정 데이터만 필터링하는 방법
> REST API 와 비교하기

## 핵심3. 뮤테이션(Mutation) - 데이서 수정
> CUD 작업 처리 방법
> 쿼리와의 차이점 소개

## 핵심 개념 3: 서브스크립션 (Subscription) - 실시간 데이터
> 웹소켓(WebSocket)을 통해 서버에서 클라이언트로 데이터를 푸시(Push)하는 방식 설명

## 루트 타입 (Root Types) 한눈에 보기

## 핵심4. 리졸버(Resolver) - 데이터 채우기
> 리졸버란 무엇인가, 쿼리가 들어왔을 때 실제 DB, API 에서 가져오는 실행 함수라는 것을 소개
> 유연성 강조: 다양한 데이터 소스를 하나로 묶을 수 있다

# GraphQL의 장단점 정리
> 장섬: 생산성 향상, 자기 문서화(Self-documentiong), 프론트 백엔드 분리 등..
> 단점/주의점: 캐싱 복잡성, 파일 업로드 처리, 초기 학습 곡선 등

# 마무리 및 다음 단계
> 모바일 클라이언트 개발자 입장에서의 감상
> 안드로이드, 스프링부트로 실습을 다음에 소개

```graphql
type User {
    name: String!
    email: String!
}
```
