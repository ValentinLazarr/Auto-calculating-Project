document.addEventListener('DOMContentLoaded', function() {


const rezbetonTextbox = document.getElementById("rezistenta-beton");
const rezotelTextbox = document.getElementById("rezistenta-otel");
const latimesectiuneTextbox = document.getElementById("latime-sectiune");
const inaltimesectiuneTextbox = document.getElementById("inaltime-sectiune");
const momentsectiuneTextbox = document.getElementById("momentul-sectiunii");
const ariaintinsaarmTextbox = document.getElementById("aria-intinsa-armatura");
const ariacomparmTextbox = document.getElementById("aria-comprimata-armatura");
const inaltimeutilsecTextbox = document.getElementById("inaltimea-utila-sectiune");
const inaltimeutilsec2Textbox = document.getElementById("inaltimea-utila-sectiune2");
const disbareTextbox = document.getElementById("distanta-bare");
const stratacopbetTextbox = document.getElementById("strat-acop-beton");
const modulotelTextbox = document.getElementById("modul-otel");
const rezmediebetonTextbox = document.getElementById("rezistenta-medie-beton");
const rezintinderebetonTextbox = document.getElementById("rezistenta-intindere-beton");
const rezintinderebeton2Textbox = document.getElementById("rezistenta-intindere-beton2");
const nrbare1Textbox = document.getElementById("nr-bare-strat1");
const nrbare2Textbox = document.getElementById("nr-bare-strat2");
const fibara1Textbox = document.getElementById("bara-1");
const fibara2Textbox = document.getElementById("bara-2");
const k1Textbox = document.getElementById("coeficient-aderenta");
const k2Textbox = document.getElementById("coeficient-deformatii");
factorTextbox = document.getElementById("factorul-incarcare")
  
function calculate()
{
    var fck = parseFloat(rezbetonTextbox.value);
    var Es = parseFloat(modulotelTextbox.value);
    var n1 = parseFloat(nrbare1Textbox.value);
    var fi1 = parseFloat(fibara1Textbox.value);
    var n2 = parseFloat(nrbare2Textbox.value) || 0;
    var fi2 = parseFloat(fibara2Textbox.value) || 0;
    var c = parseFloat(stratacopbetTextbox.value);
    var s = parseFloat(disbareTextbox.value);
    var b = parseFloat(latimesectiuneTextbox.value);
    var h = parseFloat(inaltimesectiuneTextbox.value);
    var as = parseFloat(ariaintinsaarmTextbox.value);
    var as2 = parseFloat(ariacomparmTextbox.value);
    var d2 = parseFloat(inaltimeutilsec2Textbox.value);
    var d = parseFloat(inaltimeutilsecTextbox.value);
    var ftck = parseFloat(rezintinderebetonTextbox.value);
    var m = parseFloat(momentsectiuneTextbox.value);
    var k1 = parseFloat(k1Textbox.value);
    var k2 = parseFloat(k2Textbox.value);
    var kt = parseFloat(factorTextbox.value);
    var fctm = parseFloat(rezintinderebeton2Textbox.value);
    
    if(!fck || !Es || !n1 || !fi1 || !c || !s || !b || !h || !as || !as2 || !d2 || !d || !ftck || !m || !k1 || !k2 || !kt || !fctm)
        {
            alert('Completati toate campurile!');
        } 


    var fieq = (n1 * Math.pow(fi1,2) + n2 * Math.pow(fi2, 2)) / n1 * fi1 + n2 * fi2;

    var Ecm = 22*Math.pow((fck*8)/10, 0.3);

    var alfae = Es/Ecm;

    var trigger = 5 * ( c + fieq / 2 );

    var xu = ((b * Math.pow(h,2))/2 + (alfae - 1) * ( as * d + as2 *d2)) / (b * h + (alfae - 1) * ( as + as2))


    if(s < trigger) {
        var iu = (b * Math.pow ( h , 3 )) / 12 + b * h * ( h / 2 - xu ) + ( alfae - 1) * (( as * Math.pow( d-xu , 2)) + as2 * Math.pow( xu - d2 , 2))  

        mcr = (ftck * iu) / (h - xu);

        if (m < mcr) {
            alert('Verificare moment de rupere: '+' Sectiunea NU ESTE fisurata!');
         }
        else {
            alert('Verificare moment de rupere: '+'Sectiunea ESTE fisurata')
        }
        var miu = as / (b * d);
        var alfa = alfae * miu;
        var miu1 = as2 / (b * d);
        var alfa1 = alfae * miu1;
        var lambda = d2 / d;
        var epsilon = (alfa + alfa1) * (-1 + Math.sqrt(1 +(( 2 * (alfa + lambda * alfa1)) / Math.pow(alfa + alfa1 , 2) )))

        if(epsilon < 0.5) {
            alert('Verificare epsilon: '+'Se verifica' + epsilon);
         }
        else{
            alert('Verificare epsilon: '+'Nu se verifica' + epsilon );
        }
        var x = epsilon * d;

        var vc = m / ( b * x * ( (d - x/3) / 2 ) + (alfae - 1) * as2 * (d - d2) * ( (x - d2)/x ));

        var vs = m / (as * d * (1 - epsilon/3));
        
        var hceff = Math.min(2.5 * (h-d) , (h - x) / 3 , h / 2);

        var aceff = (b * hceff) - as;
        
        var peff = as / aceff;

        var srmax = 3.4 * c + 0.425 * k1 * k2 * (fieq / peff) ;

        var fcteff = fctm * Math.pow(10, 6);


        e = ( vs - kt * (fcteff / peff) * (1 + alfae * peff) ) / Es ;

        if ( e <= 0.6 * (vs / Es))
            {
                var wk = srmax * 0.6 * (vs / Es);
            }
         else {
            var wk = srmax * e;
         }   


         if( wk < 0.3) {
            alert('Verificare fisuri: '+'Se verifica' + wk);
         }
         else {
            alert('Verificare fisuri: '+'Nu se verifica' + wk);
         }

    }
    else {
        alert("Distanta inter-ax intre armaturi din zona inchisa este mai mare decat maximul admis");
    }

   
}
document.getElementById('calcul-rezultate').addEventListener('click', calculate);
});