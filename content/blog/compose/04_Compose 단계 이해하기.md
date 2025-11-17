---
title: ComposeStudy - 04.컴포즈 단계 이해하기 
date: "2025-11-17T22:11:50.1557"
description: "제트팩 컴포즈의 단계(컴포지션-레이아웃-그리기) 에 대해 정리합니다."
categories: ["안드로이드", "컴포즈"]
tags: ["android", "jetpack compose", "컴포즈 단계"]
---


# Jetpack Compose 단계

사용자한테 시각적인 UI가 보일 때까지 Jetpack Compose 는 3개의 주요 단계를 거치게 됩니다.  
이는  
컴포즈가 컴포저블 함수를 실행해서 UI 트리를 만드는 **컴포지션** 단계,
UI 트리를 읽고 각 노드의 크기를 **측정** 하고 **배치** 하는 단계인 **레이아웃** 단계
배치된 UI를 기기 화면에 그리는 단계인 **그리기** 단계가 있습니다.

![compose_phases](./resources/compose_phasesl.svg)