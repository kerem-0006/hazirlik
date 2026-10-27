/* Kâğıt gibi alıştırma motoru (2026-10-27): midterm sayfaları ve gramer-8'in alıştırma bölümleri.
   İçerik bu dosyada DEĞİL, her sayfanın içinde (window.ALISTIRMA) durur: bu dosya şifresiz yayınlanır, sayfalar şifreli.
   Tipler: bosluk (cümlede boşluk) · metin (paragrafta boşluk) · cumle (tam cümle yaz) · secmeli (test) ·
   metinsecmeli (paragraf + test) · dy (doğru/yanlış) · kutu (kutudan harf) · hata (altı çizili yanlış) · eslestir (harf seç).
   Her bölüm ayrı kontrol edilir; sayfa sonunda toplam ve "MARS'a gönder". Yazılan cevaplar o tarayıcıda saklanır. */
(function () {
  var V = window.ALISTIRMA;
  var kok = document.getElementById('alistirma');
  if (!V || !kok) return;

  var css = [
    '.al-sec{background:var(--sheet);border:1px solid var(--line);border-radius:16px;overflow:hidden;scroll-margin-top:14px;box-shadow:0 1px 2px rgba(0,0,0,.30),0 10px 28px rgba(0,0,0,.35)}',
    '.al-h{display:flex;gap:14px;align-items:flex-start;padding:16px 18px;background:var(--teal-soft)}',
    '.al-h .rn{font:800 30px/1 var(--display);color:var(--teal);min-width:1.1em}',
    '.al-h h2{font:800 21px/1.2 var(--display);margin:0}',
    '.al-h .yon{margin:6px 0 0;font:700 14px/1.4 var(--body);color:var(--ink)}',
    '.al-h .tr{margin:4px 0 0;font-size:15px;color:var(--muted)}',
    '.al-h .puan{margin-left:auto;font:800 18px/1 var(--display);color:var(--teal);white-space:nowrap}',
    '.al-b{padding:14px 18px 18px;display:grid;gap:12px}',
    '.al-ipucu{border:1px dashed var(--teal);border-radius:12px;padding:10px 14px;display:grid;gap:4px;font-size:15px}',
    '.al-ipucu p{margin:0}.al-ipucu b{color:var(--ans)}.al-ipucu .t{color:var(--teal);font-weight:700}',
    '.al-ol{list-style:none;margin:0;padding:0;display:grid;gap:12px}',
    '.al-q{display:grid;gap:6px;padding-bottom:10px;border-bottom:1px solid var(--line)}',
    '.al-q:last-child{border-bottom:0;padding-bottom:0}',
    '.al-st{font:500 18px/1.7 var(--text);margin:0;overflow-wrap:anywhere}',
    '.al-st .no{font:800 15px var(--body);color:var(--teal);margin-right:6px}',
    '.al-in{font:700 17px var(--body);color:var(--ink);background:var(--paper);border:2px solid var(--line);border-radius:9px;padding:2px 8px;width:9em;max-width:100%;vertical-align:baseline}',
    '.al-in.w{width:100%;padding:8px 12px;margin-top:4px}',
    '.al-in.h{width:3.2em;text-align:center;text-transform:uppercase}',
    '.al-in:focus{outline:3px solid var(--ans);outline-offset:1px}',
    '.al-in.ok{border-color:var(--good);background:var(--good-bg);color:var(--good)}',
    '.al-in.no{border-color:var(--bad);background:var(--bad-bg);color:var(--bad)}',
    '.al-in.goster{border-color:var(--ans);background:var(--ans-bg);color:var(--ans)}',
    '.al-ops{display:flex;flex-wrap:wrap;gap:8px}',
    '.al-op{font:600 16px var(--body);border:2px solid var(--line);background:var(--paper);color:var(--ink);border-radius:999px;padding:6px 14px;cursor:pointer}',
    '.al-op[aria-pressed="true"]{border-color:var(--teal);background:var(--teal-soft);color:var(--teal)}',
    '.al-op.ok{border-color:var(--good);background:var(--good-bg);color:var(--good)}',
    '.al-op.no{border-color:var(--bad);background:var(--bad-bg);color:var(--bad)}',
    '.al-op.dogru{border-style:dashed;border-color:var(--good);color:var(--good)}',
    '.al-fb{font-size:15px;line-height:1.5;margin:0;color:var(--muted)}',
    '.al-fb .d{color:var(--good);font-weight:700}.al-fb .y{color:var(--bad);font-weight:700}.al-fb b{color:var(--ans)}',
    '.al-metin{font:500 18px/1.9 var(--text);margin:0;background:var(--paper);border:1px solid var(--line);border-radius:12px;padding:14px 16px}',
    '.al-metin h3{font:800 18px/1.2 var(--display);margin:0 0 6px;text-align:center}',
    '.al-metin .gn{font:800 14px var(--body);color:var(--teal)}',
    '.al-metin .gb{font-weight:800;color:var(--ans)}',
    '.al-kutu{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:4px 14px;background:var(--paper);border:1px solid var(--line);border-radius:12px;padding:12px 14px;font-size:15px}',
    '.al-kutu b{color:var(--teal);margin-right:4px}',
    '.al-alt{text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:4px;font-weight:700}',
    '.al-alt sub{font:800 12px var(--body);color:var(--teal);margin-left:1px}',
    '.al-btns{display:flex;flex-wrap:wrap;gap:8px}',
    '.al-sonuc{background:var(--sheet);border:1px solid var(--line);border-radius:20px;padding:20px;display:grid;gap:12px;box-shadow:0 1px 2px rgba(0,0,0,.30),0 10px 28px rgba(0,0,0,.35)}',
    '.al-sonuc h2{font:800 26px/1.1 var(--display);margin:0}',
    '.al-sonuc ul{list-style:none;margin:0;padding:0;display:grid;gap:4px}',
    '.al-sonuc li{display:flex;justify-content:space-between;gap:12px;border-bottom:1px solid var(--line);padding:5px 0;font-size:15px}',
    '.al-sonuc li span{color:var(--muted);text-align:right}',
    '@media (max-width:520px){.al-st,.al-metin{font-size:17px}.al-in{font-size:16px}.al-b{padding:12px 14px 16px}}'
  ].join('');
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  // gramer sayfalarındaki karşılaştırmanın aynısı: büyük/küçük harf, kesme işareti ve kısaltma farkı yanlış sayılmaz
  function norm(s) {
    s = String(s).replace(/[–—]/g, '-');
    if (/^\s*(-|x|0|yok|no article|artikel yok)\s*$/i.test(s)) return '-';
    return (' ' + s.replace(/İ/g, 'i').replace(/I/g, 'i').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’‘`´]/g, "'").replace(/ı/g, 'i') + ' ')
      .replace(/\b(is|are|was|were|do|does|did|has|have)nt\b/g, '$1 not').replace(/\bim\b/g, 'i am').replace(/\bcant\b/g, 'can not')
      .replace(/\bi'm\b/g, 'i am').replace(/\bcan't\b/g, 'can not').replace(/\bcannot\b/g, 'can not').replace(/\bwon't\b/g, 'will not')
      .replace(/n't\b/g, ' not').replace(/'re\b/g, ' are').replace(/'s\b/g, ' is')
      .replace(/[^a-z0-9' -]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  // kati: kısaltma istenen soru · kısaltılmış biçim birebir aranır
  function kati(s) { return String(s).toLowerCase().replace(/[’‘`´]/g, "'").replace(/[.?!,]+\s*$/, '').replace(/\s+/g, ' ').trim(); }
  function uyar(girdi, cevap, k) {
    if (!String(girdi).trim()) return false;
    var c = String(cevap).split('|');
    return c.some(function (o) { return k ? kati(o) === kati(girdi) : norm(o) === norm(girdi); });
  }
  function ilk(cevap) { return String(cevap).split('|')[0]; }

  var KAYIT = 'alistirma:' + location.pathname;
  var kayit = {};
  try { kayit = JSON.parse(localStorage.getItem(KAYIT) || '{}') || {}; } catch (e) { kayit = {}; }
  function sakla() { try { localStorage.setItem(KAYIT, JSON.stringify(kayit)); } catch (e) {} }

  var bolumler = [];

  // yazı kutusu: id ile saklanan değer geri gelir
  function kutu(id, sinif, ph) {
    var i = document.createElement('input');
    i.type = 'text'; i.className = 'al-in' + (sinif ? ' ' + sinif : ''); i.autocomplete = 'off'; i.spellcheck = false;
    i.setAttribute('autocapitalize', 'off'); i.setAttribute('aria-label', ph || 'Cevap'); if (ph) i.placeholder = ph;
    i.dataset.id = id; if (kayit[id] != null) i.value = kayit[id];
    i.addEventListener('input', function () { kayit[id] = i.value; sakla(); i.classList.remove('ok', 'no', 'goster'); });
    return i;
  }
  // metindeki ___ ya da [[n]] işaretlerini kutuya çevirir
  function satir(html, kutular) {
    var p = document.createElement('p'); p.className = 'al-st'; p.lang = 'en'; p.innerHTML = html;
    p.querySelectorAll('i.yer').forEach(function (y, k) { y.replaceWith(kutular[k]); });
    return p;
  }
  function geri(li) { var f = li.querySelector('.al-fb'); if (!f) { f = document.createElement('p'); f.className = 'al-fb'; li.appendChild(f); } return f; }
  function fbYaz(li, dogruMu, cevapHtml, ac, gosterMi, bos) {
    var f = geri(li);
    f.innerHTML = gosterMi ? ('Cevap: <b>' + cevapHtml + '</b>' + (ac ? ' · ' + esc(ac) : ''))
      : dogruMu ? ('<span class="d">Doğru.</span>' + (ac ? ' ' + esc(ac) : ''))
      : ('<span class="y">' + (bos ? 'Boş.' : 'Yanlış.') + '</span> Doğrusu: <b>' + cevapHtml + '</b>' + (ac ? ' · ' + esc(ac) : ''));
  }
  function secenekler(id, opts, harfli) {
    var w = document.createElement('div'); w.className = 'al-ops'; w.lang = 'en'; w.setAttribute('role', 'group');
    opts.forEach(function (o, k) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'al-op';
      b.textContent = (harfli ? 'abcdefgh'[k] + ') ' : '') + o; b.dataset.k = k;
      b.setAttribute('aria-pressed', String(kayit[id]) === String(k) ? 'true' : 'false');
      b.addEventListener('click', function () {
        w.querySelectorAll('.al-op').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); x.classList.remove('ok', 'no', 'dogru'); });
        b.setAttribute('aria-pressed', 'true'); kayit[id] = k; sakla();
      });
      w.appendChild(b);
    });
    return w;
  }
  function sec_(w, k) { w.querySelectorAll('.al-op').forEach(function (x) { x.setAttribute('aria-pressed', +x.dataset.k === k ? 'true' : 'false'); }); }
  function secili(w) { var b = w.querySelector('.al-op[aria-pressed="true"]'); return b ? +b.dataset.k : -1; }

  // ___ → kutu yeri; {a:altı çizili} → harfli alt çizgi
  function hazirla(s) {
    return esc(s).replace(/_{3,}/g, '<i class="yer"></i>')
      .replace(/\{([a-e]):([^}]*)\}/g, function (m, h, t) { return '<span class="al-alt">' + t + '<sub>' + h + ')</sub></span>'; });
  }

  V.bolumler.forEach(function (B, bi) {
    var sid = B.id || String(bi + 1);
    var sec = document.createElement('section'); sec.className = 'al-sec'; sec.id = 'b-' + sid;
    sec.innerHTML = '<div class="al-h"><span class="rn">' + esc(B.no || sid) + '</span><div><h2>' + esc(B.baslik) + '</h2>' +
      (B.yonerge ? '<p class="yon" lang="en">' + esc(B.yonerge) + '</p>' : '') + (B.tr ? '<p class="tr">' + esc(B.tr) + '</p>' : '') +
      '</div><span class="puan" aria-live="polite"></span></div><div class="al-b"></div>';
    var govde = sec.querySelector('.al-b');
    if (B.ipucu) { var ip = document.createElement('div'); ip.className = 'al-ipucu'; ip.innerHTML = B.ipucu; govde.appendChild(ip); }
    if (B.kutu) {
      var kt = document.createElement('div'); kt.className = 'al-kutu'; kt.lang = 'en';
      kt.innerHTML = B.kutu.map(function (x) { return '<span><b>' + esc(x[0]) + '.</b>' + esc(x[1]) + '</span>'; }).join('');
      govde.appendChild(kt);
    }
    var ogeler = []; // {dene(goster) -> true/false, soru}
    var ol = document.createElement('ol'); ol.className = 'al-ol';

    if (B.tip === 'metin' || B.tip === 'metinsecmeli') {
      (B.metinler || [{ baslik: B.metinBaslik, metin: B.metin, bosluklar: B.bosluklar || B.sorular }]).forEach(function (M, mi) {
        var kut = {};
        var html = (M.baslik ? '<h3>' + esc(M.baslik) + '</h3>' : '') + esc(M.metin).replace(/\n/g, '<br>').replace(/\[\[(\d+)(\.1)?\]\]/g, function (m, n, ek) {
          var g = M.bosluklar[+n]; var no = g.no != null ? g.no : (+n + 1);
          if (B.tip === 'metinsecmeli') return '<span class="gn">' + esc(no) + ')</span> <span class="gb">______</span>';
          return (ek ? '' : '<span class="gn">' + esc(no) + ')</span> ') + '<i class="yer" data-k="' + n + (ek ? '.1' : '') + '"></i>';
        });
        var p = document.createElement('div'); p.className = 'al-metin'; p.lang = 'en'; p.innerHTML = html;
        if (B.tip === 'metin') {
          p.querySelectorAll('i.yer').forEach(function (y) {
            var k = y.dataset.k, i = kutu(sid + '-' + mi + '-' + k, '', ''); kut[k] = i; y.replaceWith(i);
          });
        }
        govde.appendChild(p);
        M.bosluklar.forEach(function (g, n) {
          var no = g.no != null ? g.no : (n + 1);
          var li = document.createElement('li'); li.className = 'al-q';
          if (B.tip === 'metinsecmeli') {
            li.innerHTML = '<p class="al-st"><span class="no">' + esc(no) + '.</span></p>';
            var w = secenekler(sid + '-' + mi + '-' + n, g.o, true); li.firstChild.appendChild(w); w.style.display = 'inline-flex';
            ol.appendChild(li);
            ogeler.push({ soru: M.baslik ? M.baslik + ' ' + no : 'Soru ' + no, dene: function (gos) {
              if (gos) { sec_(w, g.a); kayit[sid + '-' + mi + '-' + n] = g.a; sakla(); }
              var s = secili(w), dm = s === g.a;
              w.querySelectorAll('.al-op').forEach(function (b) { b.classList.remove('ok', 'no', 'dogru'); if (+b.dataset.k === g.a) b.classList.add(gos || dm ? 'ok' : 'dogru'); else if (+b.dataset.k === s) b.classList.add('no'); });
              fbYaz(li, dm, esc('abcd'[g.a] + ') ' + g.o[g.a]), g.ac, gos, s === -1); return dm;
            } });
            return;
          }
          var parca = Array.isArray(g.a) ? g.a : [g.a];
          var ins = parca.map(function (x, pi) { return kut[n + (pi ? '.1' : '')]; });
          li.innerHTML = '<p class="al-fb"><span class="no">' + esc(no) + ')</span> ' + (g.ip ? esc(g.ip) : '') + '</p>';
          li.querySelector('.al-fb').classList.add('baslik');
          li.hidden = true; // boşluğun açıklaması kontrol edilince görünür
          ol.appendChild(li);
          ogeler.push({ soru: (M.baslik ? M.baslik + ' ' : '') + no + ') ' + parca.map(ilk).join(' … '), dene: function (gos) {
            var hep = true;
            ins.forEach(function (i, pi) {
              if (!i) return;
              if (gos) { i.value = ilk(parca[pi]); i.className = 'al-in goster'; kayit[i.dataset.id] = i.value; return; }
              var d = uyar(i.value, parca[pi], g.kati); hep = hep && d; i.className = 'al-in ' + (d ? 'ok' : 'no');
            });
            if (gos) sakla();
            var f = document.createElement('p'); f.className = 'al-fb';
            var cv = parca.map(function (x) { return esc(ilk(x)); }).join(' … ');
            var eski = li.querySelectorAll('.al-fb'); if (eski.length > 1) eski[1].remove();
            li.appendChild(f); li.hidden = false;
            f.innerHTML = gos ? ('Cevap: <b>' + cv + '</b>' + (g.ac ? ' · ' + esc(g.ac) : '')) : hep ? ('<span class="d">Doğru.</span> ' + esc(g.ac || '')) : ('<span class="y">' + (ins.every(function (i) { return !i || !i.value.trim(); }) ? 'Boş.' : 'Yanlış.') + '</span> Doğrusu: <b>' + cv + '</b>' + (g.ac ? ' · ' + esc(g.ac) : ''));
            return hep && !gos;
          } });
        });
      });
    } else {
      B.sorular.forEach(function (S, n) {
        var no = S.no != null ? S.no : (n + 1);
        var li = document.createElement('li'); li.className = 'al-q';
        var id = sid + '-' + n;
        var noHtml = '<span class="no">' + esc(no) + '.</span>';
        if (B.tip === 'bosluk' || B.tip === 'kutu') {
          var parca = Array.isArray(S.a) ? S.a : [S.a];
          var ins = parca.map(function (x, pi) { return kutu(id + '-' + pi, B.tip === 'kutu' ? 'h' : '', B.tip === 'kutu' ? 'harf' : ''); });
          if (!/_{3,}/.test(S.q)) { li.appendChild(satir(noHtml + hazirla(S.q), [])); ins.forEach(function (i) { i.classList.add('w'); li.appendChild(i); }); }
          else li.appendChild(satir(noHtml + hazirla(S.q), ins));
          ol.appendChild(li);
          ogeler.push({ soru: S.q.replace(/_{3,}/g, '___'), dene: function (gos) {
            var hep = true;
            ins.forEach(function (i, pi) {
              if (gos) { i.value = ilk(parca[pi]); i.className = i.className.replace(/ (ok|no|goster)/g, '') + ' goster'; kayit[i.dataset.id] = i.value; return; }
              var d = B.tip === 'kutu' ? i.value.trim().toUpperCase() === String(parca[pi]).toUpperCase() : uyar(i.value, parca[pi], S.kati);
              hep = hep && d; i.className = i.className.replace(/ (ok|no|goster)/g, '') + (d ? ' ok' : ' no');
            });
            if (gos) sakla();
            var cv = parca.map(function (x) {
              if (B.tip === 'kutu') { var k = (B.kutu || []).filter(function (y) { return y[0] === x; })[0]; return esc(x) + (k ? ' (' + esc(k[1]) + ')' : ''); }
              return esc(ilk(x));
            }).join(' … ');
            fbYaz(li, hep, cv, S.ac, gos, ins.every(function (i) { return !i.value.trim(); })); return hep && !gos;
          } });
        } else if (B.tip === 'cumle') {
          li.appendChild(satir(noHtml + hazirla(S.q), []));
          var i = kutu(id, 'w', S.ph || 'Cümlenin tamamını yaz');
          li.appendChild(i); ol.appendChild(li);
          ogeler.push({ soru: S.q, dene: function (gos) {
            if (gos) { i.value = ilk(S.a); i.className = 'al-in w goster'; kayit[id] = i.value; sakla(); fbYaz(li, true, esc(ilk(S.a)), S.ac, true); return false; }
            var d = uyar(i.value, S.a, S.kati); i.className = 'al-in w ' + (d ? 'ok' : 'no'); fbYaz(li, d, esc(ilk(S.a)), S.ac, false, !i.value.trim()); return d;
          } });
        } else if (B.tip === 'secmeli' || B.tip === 'dy' || B.tip === 'hata' || B.tip === 'eslestir') {
          var opts = B.tip === 'dy' ? ['True · Doğru', 'False · Yanlış'] : B.tip === 'hata' ? ['a', 'b', 'c', 'd'].slice(0, S.n || 4) : B.tip === 'eslestir' ? B.secenek.map(function (x) { return x[0]; }) : S.o;
          var dogru = B.tip === 'dy' ? (S.a ? 0 : 1) : B.tip === 'hata' || B.tip === 'eslestir' ? 'abcdefgh'.indexOf(S.a) : S.a;
          li.appendChild(satir(noHtml + hazirla(S.q), []));
          var w = secenekler(id, opts, B.tip === 'secmeli' && !S.harfsiz);
          li.appendChild(w); ol.appendChild(li);
          ogeler.push({ soru: S.q.replace(/\{[a-e]:([^}]*)\}/g, '$1'), dene: function (gos) {
            if (gos) { sec_(w, dogru); kayit[id] = dogru; sakla(); }
            var s = secili(w), dm = s === dogru;
            w.querySelectorAll('.al-op').forEach(function (b) { b.classList.remove('ok', 'no', 'dogru'); if (+b.dataset.k === dogru) b.classList.add(gos || dm ? 'ok' : 'dogru'); else if (+b.dataset.k === s) b.classList.add('no'); });
            var cv = B.tip === 'dy' ? (S.a ? 'True (Doğru)' : 'False (Yanlış)') : B.tip === 'eslestir' ? esc(S.a + ' · ' + B.secenek[dogru][1]) : B.tip === 'hata' ? esc(S.a + ')') : esc((S.harfsiz ? '' : 'abcdefgh'[dogru] + ') ') + opts[dogru]);
            fbYaz(li, dm, cv, S.ac, gos, s === -1); return dm && !gos;
          } });
        }
      });
    }
    govde.appendChild(ol);
    if (B.tip === 'eslestir') {
      var ek = document.createElement('div'); ek.className = 'al-kutu';
      ek.innerHTML = B.secenek.map(function (x) { return '<span><b>' + esc(x[0]) + '</b>' + esc(x[1]) + '</span>'; }).join('');
      ek.style.gridTemplateColumns = '1fr'; govde.insertBefore(ek, ol);
    }
    if (B.son) { var sn = document.createElement('p'); sn.className = 'al-fb'; sn.innerHTML = B.son; govde.appendChild(sn); }

    var bt = document.createElement('div'); bt.className = 'al-btns';
    bt.innerHTML = '<button class="btn primary" type="button">Kontrol et</button><button class="btn hint" type="button">Cevapları göster</button><button class="btn quiet" type="button">Temizle</button>';
    govde.appendChild(bt);
    var puan = sec.querySelector('.puan');
    var durum = { sid: sid, baslik: B.baslik, n: ogeler.length, dogru: null, kacan: [] };
    var b = bt.querySelectorAll('button');
    b[0].addEventListener('click', function () {
      var d = 0, k = [];
      ogeler.forEach(function (o) { if (o.dene(false)) d++; else k.push(o.soru); });
      durum.dogru = d; durum.kacan = k; puan.textContent = d + ' / ' + ogeler.length; ozet();
    });
    b[1].addEventListener('click', function () { ogeler.forEach(function (o) { o.dene(true); }); puan.textContent = 'cevaplar açık'; });
    b[2].addEventListener('click', function () {
      sec.querySelectorAll('.al-in').forEach(function (i) { i.value = ''; i.className = i.className.replace(/ (ok|no|goster)/g, ''); delete kayit[i.dataset.id]; });
      sec.querySelectorAll('.al-op').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); x.classList.remove('ok', 'no', 'dogru'); });
      Object.keys(kayit).forEach(function (key) { if (key.indexOf(sid + '-') === 0) delete kayit[key]; });
      sakla();
      sec.querySelectorAll('.al-q .al-fb').forEach(function (f) { if (!f.classList.contains('baslik')) f.remove(); else f.parentNode.hidden = true; });
      durum.dogru = null; durum.kacan = []; puan.textContent = ''; ozet();
    });
    bolumler.push(durum);
    kok.appendChild(sec);
  });

  var sonuc = document.createElement('section'); sonuc.className = 'al-sonuc'; sonuc.setAttribute('aria-live', 'polite');
  var tuslar = null;
  function ozet() {
    var yap = bolumler.filter(function (x) { return x.dogru !== null; });
    var T = 0, D = 0; yap.forEach(function (x) { T += x.n; D += x.dogru; });
    sonuc.innerHTML = '<h2>' + (yap.length ? 'Sonuç: ' + D + ' / ' + T + ' (%' + Math.round(D / T * 100) + ')' : 'Sonuç') + '</h2>' +
      '<p class="note">' + (yap.length ? 'Kontrol ettiğin bölümler. Diğer bölümleri de kontrol edince buraya eklenir.' : 'Bir bölümün altındaki "Kontrol et" tuşuna basınca puanın burada toplanır.') + '</p>' +
      '<ul>' + bolumler.map(function (x) { return '<li><b>' + esc(x.sid) + ' · ' + esc(x.baslik) + '</b><span>' + (x.dogru === null ? 'kontrol edilmedi' : x.dogru + ' / ' + x.n) + '</span></li>'; }).join('') + '</ul>';
    if (yap.length && window.MARS) {
      tuslar = MARS.tuslar(sonuc, function () {
        return { tur: V.tur || 'gramer', ad: V.ad, parca: yap.slice(0, 12).map(function (x) { return { unite: (V.kisa + ' ' + x.sid).slice(0, 20), sorulan: x.n, dogru: x.dogru, yarim: 0 }; }),
          kacan: [].concat.apply([], yap.map(function (x) { return x.kacan; })).slice(0, 20) };
      }, function () {
        return V.ad + ': ' + D + ' / ' + T + ' (%' + Math.round(D / T * 100) + '). ' + yap.map(function (x) { return x.sid + ' ' + x.dogru + '/' + x.n; }).join(', ') +
          (yap.some(function (x) { return x.kacan.length; }) ? ' · Kaçanlar: ' + [].concat.apply([], yap.map(function (x) { return x.kacan; })).slice(0, 20).join(' / ') : '');
      });
    }
  }
  ozet();
  kok.appendChild(sonuc);
})();
