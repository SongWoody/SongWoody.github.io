---
title: 로그인&보안 실전 - 초안
date: "2025-08-12T21:27:03.284Z"
description: "로그인&안 실전 - 초안."
categories: ["백엔드", "보안"]
tags: ["backend", "security", "login"]
draft: true
---
# 시리즈 구성
  
- 로그인 방식별
  - ID/PW, 
  - OAuth, 
  - 소셜 로그인, 
  - 패스키, 
  - 2FA
- 보안 항목
  - XSS, 
  - CSRF
  - 세션 하이재킹 방지


실습 계획서 — 로그인 & 보안 구현
1. 목표
다양한 로그인 방식(이메일/비밀번호, OAuth, 소셜 로그인, 패스키 등) 구현

각 방식별 주요 보안 위협과 대응책 적용

실제 동작하는 데모 프로젝트 완성 후, 이를 바탕으로 블로그 포스트 작성

2. 환경 설정
개발 언어/플랫폼:

Web: Node.js(Express) + Vanilla JS

Android: Kotlin (Jetpack Compose or XML)

iOS: SwiftUI or UIKit

DB: MySQL / PostgreSQL (Docker로 구동)

보안 도구: HTTPS(Localhost SSL), Postman, Wireshark(패킷 검증)

3. 실습 시나리오
1단계 – 기본 이메일/비밀번호 로그인
회원가입 API 구현

비밀번호 해싱(BCrypt) 적용

세션 기반 로그인 구현

세션 하이재킹 방지(Cookie HttpOnly, Secure 속성)

2단계 – JWT 로그인
Access Token / Refresh Token 발급

토큰 만료 & 재발급 로직

토큰 탈취 방지 전략(짧은 TTL + Sliding Session)

3단계 – OAuth2 소셜 로그인
GitHub 또는 Google OAuth 연동

Callback 처리 및 토큰 저장

기존 사용자와 신규 사용자 구분 로직

4단계 – 패스키(Passkey) / WebAuthn
WebAuthn API로 패스키 로그인 구현

로컬 장치 인증 연동(FIDO2)

5단계 – 2단계 인증(2FA)
이메일 OTP / Google Authenticator 연동

백업 코드 발급 기능

4. 보안 실습 체크리스트
HTTPS 적용 및 인증서 테스트

CSRF 방지 (CSRF Token 발급 및 검증)

XSS 방지 (출력 시 HTML 이스케이프)

브루트포스 방지(로그인 시도 제한)

비밀번호 최소 길이 및 복잡성 정책 적용

5. 결과물
각 로그인 방식별 독립된 예제 프로젝트

기능 + 보안 적용 내용 정리 문서

테스트 시나리오 및 검증 결과 캡처

블로그 포스트 작성 초안(Initial Draft)