---
title: DC-DC buck converter & measurement circuits
summary: DC-DC buck design with inductor/capacitor sizing and PWM, plus voltage and current measurement with LM358 op-amps and a shunt.
status: Completed
date: Aug – Sep 2024
context: GP Tech internship
tags: [Power Electronics, Analog, LTspice]
order: 2
cover:
  label: 'Op-amp circuits on a breadboard'
  src: /projects/gp-tech/opamp-breadboard.jpg
  alt: 'Op-amp circuits built on a breadboard'
whatIDid:
  - Designed a DC-DC buck converter (inductor/capacitor sizing, PWM and duty-cycle control) and analysed a commercial XL4016-based module.
  - Built DC voltage and current measurement circuits using LM358 op-amps, a shunt resistor and an ICL7660 to generate the negative supply rail.
  - Simulated inverting and non-inverting op-amp circuits (741, LM358, OP747) in LTspice and Proteus before building them.
tools: [XL4016, LM358, ICL7660, '741', OP747, LTspice, Proteus]
gallery:
  - label: 'Op-amp circuits built on a breadboard'
    src: /projects/gp-tech/opamp-breadboard.jpg
    alt: 'Op-amp circuits built on a breadboard'
  - label: 'Non-inverting op-amp (OP747) simulated in LTspice'
    src: /projects/gp-tech/opamp-ltspice.png
    alt: 'LTspice schematic of a non-inverting OP747 op-amp circuit with +12 V and -12 V sources'
    fit: contain
  - label: 'Voltage divider with +12 V and -12 V inputs, simulated in Proteus'
    src: /projects/gp-tech/voltage-divider-proteus.png
    alt: 'Proteus simulation of a voltage divider between +12 V and -12 V with a voltmeter'
    fit: contain
  - label: 'TODO: buck converter schematic (public/projects/gp-tech/buck-schematic.jpg)'
  - label: 'TODO: XL4016 module photo (public/projects/gp-tech/xl4016.jpg)'
---
