---
title: Kablosuz EMG / EKG / EOG ölçüm cihazı
fullTitle: Yüksek CMRR'li Tek Bir Analog Ön Uç ile Üç Biyosinyalin (EMG/EKG/EOG) Seçmeli Ölçümü ve Gerçek Zamanlı BLE İletimi
summary: Üç ayrı devre yerine tek bir anahtarlanabilir analog ön uç üç biyosinyali okur ve Bluetooth Low Energy ile aktarır.
status: In progress
# TODO: proje tarihlerini ekle (başlangıç / beklenen bitiş), ör. "2025 – 2027"
context: TÜBİTAK 2209-A destekli araştırma projesi ve bitirme projesi — Sakarya Uygulamalı Bilimler Üniversitesi
contextTags: [TÜBİTAK 2209-A, Bitirme projesi]
tags: [Biyomedikal, Analog, Gömülü, BLE]
featured: true
order: 1
cover:
  label: 'PCB konsepti (üstten görünüm)'
  src: /projects/biosignal/pcb-concept.webp
  alt: "Planlanan PCB'nin konsept çizimi: CD4051 çoklayıcı, AD620 yükselteç, filtreler ve ESP32 modülü"
  fit: contain
problem: Üç biyosinyali — kas (EMG), kalp (EKG) ve göz hareketi (EOG) — ölçmek normalde üç ayrı sinyal zinciri gerektirir. Bu da daha fazla maliyet, boyut ve güç demektir.
approach: Üç sinyal arasında geçiş yapan tek bir ortak analog ön uç; ölçümler ardından Bluetooth Low Energy (BLE) ile gönderilir.
chain:
  - { name: Elektrotlar, role: Sinyali vücuttan alır }
  - { name: CD4051 çoklayıcı, role: Kanal seçimi }
  - { name: AD620 enstrümantasyon yükselteci, role: Kazanç 100 }
  - { name: 'Yüksek geçiren 0,08 Hz', role: DC ofseti giderir }
  - { name: Alçak geçiren ~600 Hz, role: Yüksek frekanslı gürültüyü giderir }
  - { name: ESP32, role: ADC + BLE }
chainNote: Ayrıca 50 Hz şebeke girişimini bastırmak için bir sağ bacak sürücü (RLD) devresi.
whatIDid:
  - "Tüm tasarımı simülasyonda gözden geçirip hataları düzelttim: alçak geçiren filtre 500 Hz yerine 180 Hz'de kesiyordu; yüksek geçiren filtre EOG sinyalinin ~%60'ını yok ediyordu."
  - ESP32 ADC'nin bipolar sinyali okuyabilmesi için 1,65 V referans (VREF) ekledim; gerçekçi testler için RLD devresi, vücut modeli ve 50 Hz gürültü enjeksiyonu da ekledim.
  - Malzeme listesini ve 9 aşamalı montaj ve test kılavuzunu hazırladım; teslimattan önce bir sipariş hatasını (kΩ yerine Ω dirençler) yakaladım.
  - 'Donanım üzerinde kurup doğruladım: güç rayları (±9 V, 3,3 V), VREF, çoklayıcı, enstrümantasyon yükselteci ve yüksek geçiren katlar.'
results:
  - { value: '×100', label: Yükselteç kazancı — tasarlandığı gibi }
  - { value: '0,08–593 Hz', label: Bant genişliği (sim.) }
  - { value: ~127–144 dB, label: RLD ile CMRR (sim.) }
  - { value: 3 / 3, label: Simülasyonda çalışan kanal }
resultsNote: Simülasyon sonuçları. CMRR değerleri veri sayfası tabanlı modellere dayanır.
tools: [AD620, CD4051, ESP32, BLE, LTspice, Proteus]
gallery:
  - label: 'PCB konsepti, üstten görünüm — konsept çizim, nihai yerleşim değildir'
    src: /projects/biosignal/pcb-concept.webp
    alt: "Planlanan PCB'nin konsept çizimi: elektrot girişleri, CD4051, AD620, yüksek geçiren filtre, TL074, ±9 V besleme ve ESP32 modülü"
    fit: contain
  - label: 'Cihaz konsepti: kutu, elektrotlar ve BLE ile mobil uygulama — konsept çizim'
    src: /projects/biosignal/device-concept.webp
    alt: 'Beş elektrot girişli cihaz kutusunun ve BLE ile EKG ve EMG sinyallerini gösteren mobil uygulamanın konsept çizimi'
    fit: contain
  - label: 'TODO: frekans yanıtı grafiği (public/projects/biosignal/frequency-response.png)'
  - label: 'TODO: CMRR grafiği (public/projects/biosignal/cmrr.png)'
  - label: 'TODO: breadboard fotoğrafı (public/projects/biosignal/breadboard.jpg)'
nextSteps:
  - Alçak geçiren katın donanımda kurulması.
  - 'ESP32 yazılımı: en az 1 kS/s örnekleme, paketli BLE aktarımı, dijital 50 Hz filtre.'
  - Sağ bacak sürücünün (RLD) donanımda kurulması.
  - EMG, EKG ve EOG için vücut üzerinde testler.
  - Ölçülen CMRR'nin simülasyonla karşılaştırılması.
disclaimer: Araştırma/eğitim amaçlı prototip — tıbbi cihaz değildir.
---
