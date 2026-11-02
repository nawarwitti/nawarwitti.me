---
title: محوّل خافض DC-DC (Buck) ودارات القياس
summary: تصميم محوّل Buck مع حساب الملف والمكثّف والتحكم بـ PWM، إضافةً إلى قياس الجهد والتيار بمضخّمات LM358 ومقاومة تحويلة (Shunt).
status: Completed
date: أغسطس – سبتمبر 2024
context: تدريب GP Tech
tags:
  - إلكترونيات القدرة
  - تماثلي
  - LTspice
order: 2
cover:
  label: 'دارات مضخّمات عملياتية على لوحة تجارب'
  src: /projects/gp-tech/opamp-breadboard.jpg
  alt: 'دارات مضخّمات عملياتية مبنية على لوحة تجارب'
whatIDid:
  - صمّمت محوّل خافض DC-DC (حساب الملف والمكثّف، والتحكم بـ PWM ودورة العمل) وحلّلت وحدة تجارية مبنية على XL4016.
  - بنيت دارات لقياس الجهد والتيار المستمر باستخدام مضخّمات LM358 ومقاومة تحويلة، وICL7660 لتوليد خط التغذية السالب.
  - حاكيت دارات المضخّم العاكس وغير العاكس (741، LM358، OP747) في LTspice وProteus قبل بنائها.
tools: [XL4016, LM358, ICL7660, '741', OP747, LTspice, Proteus]
gallery:
  - label: 'دارات مضخّمات عملياتية مبنية على لوحة تجارب'
    src: /projects/gp-tech/opamp-breadboard.jpg
    alt: 'دارات مضخّمات عملياتية مبنية على لوحة تجارب'
  - label: 'مضخّم غير عاكس (OP747) بمحاكاة LTspice'
    src: /projects/gp-tech/opamp-ltspice.png
    alt: 'مخطط LTspice لدارة مضخّم OP747 غير عاكس مع مصدرين +12 V و-12 V'
    fit: contain
  - label: 'مقسّم جهد بمدخلين +12 V و-12 V بمحاكاة Proteus'
    src: /projects/gp-tech/voltage-divider-proteus.png
    alt: 'محاكاة Proteus لمقسّم جهد بين +12 V و-12 V مع فولتميتر'
    fit: contain
  - label: 'TODO: مخطط محوّل Buck (public/projects/gp-tech/buck-schematic.jpg)'
  - label: 'TODO: صورة وحدة XL4016 (public/projects/gp-tech/xl4016.jpg)'
---
