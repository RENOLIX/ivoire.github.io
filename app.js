'use strict';
const wilayas=['Adrar','Chlef','Laghouat','Oum El Bouaghi','Batna','Béjaïa','Biskra','Béchar','Blida','Bouira','Tamanrasset','Tébessa','Tlemcen','Tiaret','Tizi Ouzou','Alger','Djelfa','Jijel','Sétif','Saïda','Skikda','Sidi Bel Abbès','Annaba','Guelma','Constantine','Médéa','Mostaganem','M’Sila','Mascara','Ouargla','Oran','El Bayadh','Illizi','Bordj Bou Arréridj','Boumerdès','El Tarf','Tindouf','Tissemsilt','El Oued','Khenchela','Souk Ahras','Tipaza','Mila','Aïn Defla','Naâma','Aïn Témouchent','Ghardaïa','Relizane','Timimoun','Bordj Badji Mokhtar','Ouled Djellal','Béni Abbès','In Salah','In Guezzam','Touggourt','Djanet','El M’Ghair','El Meniaa'];
const $=selector=>document.querySelector(selector);
const form=$('#commande-form');
const wilaya=$('#wilaya');
const money=amount=>`${amount.toLocaleString('fr-FR')} DA`;
let quantity=1;
wilayas.forEach((name,index)=>{const option=document.createElement('option');option.value=name;option.textContent=`${String(index+1).padStart(2,'0')} — ${name}`;wilaya.append(option)});
function update(){
  const home=$('input[name="Mode de livraison"]:checked').value==='Domicile';
  $('#address-wrap').hidden=!home;
  $('#address').disabled=!home;
  $('#address').required=home;
  $('#quantity').textContent=String(quantity);
  $('#subtotal').textContent=money(quantity*950);
  $('#total').textContent=money(quantity*950);
  $('#minus').disabled=quantity===1;
  $('#plus').disabled=quantity===20;
}
$('#minus').addEventListener('click',()=>{quantity=Math.max(1,quantity-1);update()});
$('#plus').addEventListener('click',()=>{quantity=Math.min(20,quantity+1);update()});
document.querySelectorAll('input[name="Mode de livraison"]').forEach(input=>input.addEventListener('change',update));
form.addEventListener('submit',event=>{
  event.preventDefault();
  const phone=form.elements['Téléphone'];
  const normalized=phone.value.replace(/[\s.\-()]/g,'');
  phone.setCustomValidity(/^(?:0[567]\d{8}|\+213[567]\d{8})$/.test(normalized)?'':'Saisissez un numéro algérien valide (05, 06, 07 ou +213).');
  if(!form.reportValidity())return;
  const status=$('#form-status');
  status.hidden=false;
  status.textContent='Votre formulaire est prêt. L’envoi des commandes sera activé dès qu’une destination de réception sera configurée.';
  status.scrollIntoView({behavior:'smooth',block:'nearest'});
});
form.elements['Téléphone'].addEventListener('input',event=>event.target.setCustomValidity(''));
$('#year').textContent=new Date().getFullYear();
update();
