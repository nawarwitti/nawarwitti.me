---
title: DC-DC buck dönüştürücü ve ölçüm devreleri
summary: Bobin/kondansatör boyutlandırma ve PWM ile DC-DC buck tasarımı; LM358 op-amp'ler ve şönt ile gerilim ve akım ölçümü.
status: Completed
date: Ağu – Eyl 2024
context: GP Tech stajı
tags: [Güç Elektroniği, Analog, LTspice]
order: 2
cover:
  label: 'Breadboard üzerinde op-amp devreleri'
  src: /projects/gp-tech/opamp-breadboard.jpg
  alt: 'Breadboard üzerinde kurulmuş op-amp devreleri'
whatIDid:
  - Bir DC-DC buck dönüştürücü tasarladım (bobin/kondansatör boyutlandırma, PWM ve görev döngüsü kontrolü) ve XL4016 tabanlı ticari bir modülü analiz ettim.
  - LM358 op-amp'ler, bir şönt direnç ve negatif besleme rayını üretmek için ICL7660 kullanarak DC gerilim ve akım ölçüm devreleri kurdum.
  - Eviren ve evirmeyen op-amp devrelerini (741, LM358, OP747) kurmadan önce LTspice ve Proteus'ta simüle ettim.
tools: [XL4016, LM358, ICL7660, '741', OP747, LTspice, Proteus]
gallery:
  - label: 'Breadboard üzerinde kurulmuş op-amp devreleri'
    src: /projects/gp-tech/opamp-breadboard.jpg
    alt: 'Breadboard üzerinde kurulmuş op-amp devreleri'
  - label: "LTspice'ta simüle edilen evirmeyen op-amp (OP747)"
    src: /projects/gp-tech/opamp-ltspice.png
    alt: '+12 V ve -12 V kaynaklı, evirmeyen OP747 op-amp devresinin LTspice şeması'
    fit: contain
  - label: "Proteus'ta simüle edilen +12 V / -12 V girişli gerilim bölücü"
    src: /projects/gp-tech/voltage-divider-proteus.png
    alt: '+12 V ile -12 V arasında voltmetreli gerilim bölücünün Proteus simülasyonu'
    fit: contain
  - label: 'TODO: buck dönüştürücü şeması (public/projects/gp-tech/buck-schematic.jpg)'
  - label: 'TODO: XL4016 modül fotoğrafı (public/projects/gp-tech/xl4016.jpg)'
---
