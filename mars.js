/* MARS'a gönder ve Sonucu kopyala: bütün çalışma sayfalarının ortak tuşları (2026-10-13).
   Gönder: Kerem'in Mac'inde MARS paneli açıksa sonuç doğrudan ilerleme tablosuna yazılır.
   Panel kapalıysa ya da telefondaysan sonuç panoya kopyalanır, MARS'a yapıştırılır. */
(function () {
  var ADRES = 'http://127.0.0.1:8765/api/sonuc';

  function kopyala(metin, tamam, olmadi) {
    function eski() {
      var ta = document.createElement('textarea');
      ta.value = metin; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      ta.remove(); (ok ? tamam : olmadi)();
    }
    try { navigator.clipboard.writeText(metin).then(tamam, eski); } catch (e) { eski(); }
  }

  function yaz(el, metin, tur) { if (!el) return; el.textContent = metin; el.className = 'note mars-durum' + (tur ? ' ' + tur : ''); }

  /* veri: {tur, ad, dogru, toplam, kacan[]} ya da {tur, ad, parca:[{unite, sorulan, dogru, yarim}], kacan[]}
     metin: panoya giden düz metin · durum: mesajın yazılacağı öğe */
  function gonder(veri, metin, durum, tus) {
    if (tus) tus.disabled = true;
    yaz(durum, 'Gönderiliyor...');
    var bitti = false;
    var zaman = setTimeout(function () { if (!bitti) { bitti = true; yedek(true); } }, 8000);
    function yedek(bekliyor) {
      if (tus) tus.disabled = false;
      kopyala('MARS SONUÇ · ' + metin,
        function () { yaz(durum, bekliyor ? 'Panel cevap vermedi. Chrome "yerel ağ" izni soruyorsa İzin ver de: sonuç yine de gider ve burada yazar, o zaman yapıştırmana gerek kalmaz. Gitmezse sonuç kopyalandı, MARS\'a yapıştır.' : 'MARS paneline ulaşılamadı (panel kapalı ya da telefondasın). Sonuç kopyalandı, MARS\'a yapıştır.', 'mid'); },
        function () { yaz(durum, 'MARS paneline ulaşılamadı. Bu metni MARS\'a yapıştır: MARS SONUÇ · ' + metin, 'mid'); });
    }
    try {
      fetch(ADRES, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(veri), targetAddressSpace: 'local' })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok && j.ok, j: j }; }); })
        .then(function (s) {
          var gec = bitti; bitti = true; clearTimeout(zaman);
          if (s.ok) { yaz(durum, 'MARS\'a gönderildi ve ilerleme tablosuna yazıldı: ' + s.j.ozet, 'ok'); if (tus) { tus.textContent = 'Gönderildi'; tus.disabled = true; } }
          else if (!gec) yedek();
        })
        .catch(function () { if (!bitti) { bitti = true; clearTimeout(zaman); yedek(); } });
    } catch (e) { if (!bitti) { bitti = true; clearTimeout(zaman); yedek(); } }
  }

  /* Sonuç alanına iki tuşu koyar. kutu: tuşların ekleneceği öğe */
  function tuslar(kutu, veriFn, metinFn) {
    var w = document.createElement('div'); w.className = 'mars-tuslar';
    w.innerHTML = '<button class="btn primary" type="button">MARS\'a gönder</button><button class="btn" type="button">Sonucu kopyala</button><p class="note mars-durum" aria-live="polite"></p>';
    var b = w.querySelectorAll('button'), d = w.querySelector('.mars-durum');
    b[0].addEventListener('click', function () { gonder(veriFn(), metinFn(), d, b[0]); });
    b[1].addEventListener('click', function () {
      var m = 'MARS SONUÇ · ' + metinFn();
      kopyala(m, function () { yaz(d, 'Kopyalandı. MARS\'a yapıştırabilirsin.', 'ok'); }, function () { yaz(d, m); });
    });
    kutu.appendChild(w);
    return w;
  }

  var st = document.createElement('style');
  st.textContent = '.mars-tuslar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:10px}.mars-tuslar .mars-durum{flex-basis:100%;margin:0}.mars-durum.ok{color:var(--good)}.mars-durum.mid{color:var(--mid)}';
  document.head.appendChild(st);
  window.MARS = { gonder: gonder, tuslar: tuslar, kopyala: kopyala };
})();
