---
title: Wireless EMG / EKG / EOG acquisition device
fullTitle: Selectable Acquisition of Three Biosignals (EMG/EKG/EOG) via a Single High-CMRR Analog Front-End with Real-Time BLE Transmission
summary: One switchable analog front-end reads three biosignals instead of three separate circuits, then streams them over Bluetooth Low Energy.
status: In progress
# TODO: add the project dates (start / expected end), e.g. "2025 – 2027"
context: TÜBİTAK 2209-A supported research project & graduation project — Sakarya University of Applied Sciences
contextTags: [TÜBİTAK 2209-A, Graduation project]
tags: [Biomedical, Analog, Embedded, BLE]
featured: true
order: 1
cover:
  label: 'TODO: block diagram (public/projects/biosignal/block-diagram.png)'
  alt: Block diagram of the biosignal acquisition device
problem: Measuring three biosignals — muscle (EMG), heart (EKG) and eye movement (EOG) — normally needs three separate signal chains. That means more cost, more size and more power.
approach: One shared analog front-end that switches between the three signals, then sends the readings over Bluetooth Low Energy (BLE).
chain:
  - { name: Electrodes, role: Pick up the signal from the body }
  - { name: CD4051 multiplexer, role: Channel select }
  - { name: AD620 in-amp, role: Gain 100 }
  - { name: High-pass 0.08 Hz, role: Removes the DC offset }
  - { name: Low-pass ~600 Hz, role: Removes high-frequency noise }
  - { name: ESP32, role: ADC + BLE }
chainNote: Plus a right-leg drive (RLD) circuit to suppress 50 Hz mains interference.
whatIDid:
  - 'Reviewed the full design in simulation and corrected errors: the low-pass filter was cutting at 180 Hz instead of 500 Hz; the high-pass filter was removing ~60% of the EOG signal.'
  - Added a 1.65 V reference (VREF) so the ESP32 ADC can read the bipolar signal, plus an RLD circuit, a body model and 50 Hz noise injection for realistic testing.
  - Prepared the bill of materials and a 9-stage assembly and test guide; caught an ordering error (Ω instead of kΩ resistors) before delivery.
  - 'Built and verified on hardware: power rails (±9 V, 3.3 V), VREF, multiplexer, instrumentation amplifier and high-pass stages.'
results:
  - { value: '×100', label: Amplifier gain — exactly as designed }
  - { value: 0.08–593 Hz, label: Bandwidth (sim.) }
  - { value: ~127–144 dB, label: CMRR with RLD (sim.) }
  - { value: 3 / 3, label: Channels working in simulation }
resultsNote: Simulation results. CMRR values use datasheet-based models.
tools: [AD620, CD4051, ESP32, BLE, LTspice, Proteus]
gallery:
  - label: 'TODO: frequency response plot (public/projects/biosignal/frequency-response.png)'
  - label: 'TODO: CMRR plot (public/projects/biosignal/cmrr.png)'
  - label: 'TODO: breadboard photo (public/projects/biosignal/breadboard.jpg)'
nextSteps:
  - Low-pass stage on hardware.
  - 'ESP32 firmware: at least 1 kS/s sampling, packetised BLE streaming, digital 50 Hz filter.'
  - Right-leg drive (RLD) on hardware.
  - On-body tests for EMG, EKG and EOG.
  - Measured CMRR compared with simulation.
disclaimer: Research/educational prototype — not a medical device.
---
