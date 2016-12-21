
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}   

/* repeatString() returns a string which has been repeated a set number of times */ 
function repeatString(str, num) {
    out = '';
    for (var i = 0; i < num; i++) {
        out += str; 
    }
    return out;
}

/*
dump() displays the contents of a variable like var_dump() does in PHP. dump() is
better than typeof, because it can distinguish between array, null and object.  
Parameters:
  v:              The variable
  howDisplay:     "none", "body", "alert" (default)
  recursionLevel: Number of times the function has recursed when entering nested
                  objects or arrays. Each level of recursion adds extra space to the 
                  output to indicate level. Set to 0 by default.
Return Value:
  A string of the variable's contents 
Limitations:
  Can't pass an undefined variable to dump(). 
  dump() can't distinguish between int and float.
  dump() can't tell the original variable type of a member variable of an object.
  These limitations can't be fixed because these are *features* of JS. However, dump()
*/

function dump(v, howDisplay, recursionLevel) {
    howDisplay = (typeof howDisplay === 'undefined') ? "alert" : howDisplay;
    recursionLevel = (typeof recursionLevel !== 'number') ? 0 : recursionLevel;


    var vType = typeof v;
    var out = vType;

    switch (vType) {
        case "number":
            /* there is absolutely no way in JS to distinguish 2 from 2.0
            so 'number' is the best that you can do. The following doesn't work:
            var er = /^[0-9]+$/;
            if (!isNaN(v) && v % 1 === 0 && er.test(3.0))
                out = 'int';*/
        case "boolean":
            out += ": " + v;
            break;
        case "string":
            out += "(" + v.length + '): "' + v + '"';
            break;
        case "object":
            //check if null
            if (v === null) {
                out = "null";

            }
            //If using jQuery: if ($.isArray(v))
            //If using IE: if (isArray(v))
            //this should work for all browsers according to the ECMAScript standard:
            else if (Object.prototype.toString.call(v) === '[object Array]') {  
                out = 'array(' + v.length + '): {\n';
                for (var i = 0; i < v.length; i++) {
                    out += repeatString('   ', recursionLevel) + "   [" + i + "]:  " + 
                        dump(v[i], "none", recursionLevel + 1) + "\n";
                }
                out += repeatString('   ', recursionLevel) + "}";
            }
            else { //if object    
                sContents = "{\n";
                cnt = 0;
                for (var member in v) {
                    //No way to know the original data type of member, since JS
                    //always converts it to a string and no other way to parse objects.
                    sContents += repeatString('   ', recursionLevel) + "   " + member +
                        ":  " + dump(v[member], "none", recursionLevel + 1) + "\n";
                    cnt++;
                }
                sContents += repeatString('   ', recursionLevel) + "}";
                out += "(" + cnt + "): " + sContents;
            }
            break;
    }

    if (howDisplay == 'body') {
        var pre = document.createElement('pre');
        pre.innerHTML = out;
        document.body.appendChild(pre)
    }
    else if (howDisplay == 'alert') {
        alert(out);
    }

    return out;
}

// ----------------------------------------------------------------------------------------------- //

function limitaText( p_objCampo, p_permitido ) {
   if (  p_objCampo.value.length > p_permitido ) {
         p_objCampo.value =  p_objCampo.value.substr( 0, p_permitido )

      if ( p_objCampo.value.length > p_permitido )  
         p_objCampo.value =  p_objCampo.value.substr( 0, p_permitido-1 )
   }
 } 

function converteMoedaFloat(valor){
      
      if(valor === ""){
         valor =  0;
      }else{
         valor = valor.replace(".","");
         valor = valor.replace(",",".");
         valor = parseFloat(valor);
      }
      return valor;

   }
   
   /*   @brief Converte um valor em formato float para uma string em formato moeda
      @param valor(float) - o valor float
      @return valor(string) - o valor em moeda
   */
   function converteFloatMoeda(valor){
      var inteiro = null, decimal = null, c = null, j = null;
      var aux = new Array();
      valor = ""+valor;
      c = valor.indexOf(".",0);
      //encontrou o ponto na string
      if(c > 0){
         //separa as partes em inteiro e decimal
         inteiro = valor.substring(0,c);
         decimal = valor.substring(c+1,valor.length);
      }else{
         inteiro = valor;
      }
      
      //pega a parte inteiro de 3 em 3 partes
      for (j = inteiro.length, c = 0; j > 0; j-=3, c++){
         aux[c]=inteiro.substring(j-3,j);
      }
      
      //percorre a string acrescentando os pontos
      inteiro = "";
      for(c = aux.length-1; c >= 0; c--){
         inteiro += aux[c]+'.';
      }
      //retirando o ultimo ponto e finalizando a parte inteiro
      
      inteiro = inteiro.substring(0,inteiro.length-1);
      
      decimal = parseInt(decimal);
      if(isNaN(decimal)){
         decimal = "00";
      }else{
         decimal = ""+decimal;
         if(decimal.length === 1){
            decimal = decimal+"0";
         }
         else{
            decimal = decimal.substr(0,2); 
         }
      }
      
      
      valor = inteiro+","+decimal;
      
      
      return valor;

   }


function mascaraMoeda(_obj,_evnt,_func,_desc){
  if( !specialKeys(_evnt) ){
    _obj.value = formataMoeda(_obj.value,_desc);
    if(_func){ eval(_func); }
  }
}

function mascaraInt(_obj,_evnt,_func){
  if( !specialKeys(_evnt) ){
    mascaraFloat(_obj,-1,_evnt);
    if(_func){ eval(_func); }
  }
}

function mascaraFloat(_obj,_desc,_evnt,_func){
  if( !specialKeys(_evnt) ){
    _obj.value = formataFloat(_obj.value,_desc);
    if(_func){ eval(_func); }
  }
}

function mascaraData(_obj,_evnt,_func){
  if( !specialKeys(_evnt) ){
    _obj.value = formataData(_obj.value);
    if(_func){ eval(_func); }
  }
}

function mascaraCEP(_obj,_evnt,_func){
  if( !specialKeys(_evnt) ){
    _obj.value = formataCEP(_obj.value);
    if(_func){ eval(_func); }
  }
}

function mascaraPORCENTO(_obj,_evnt,_func,_desc){
  if( !specialKeys(_evnt) ){
    _obj.value = formataPORCENTO(_obj.value,_desc);
    if(_func){ eval(_func); }
  }
}

function mascaraCPF(_obj,_evnt,_func){
  if( !specialKeys(_evnt) ){
    _obj.value = formataCPF(_obj.value);
    if(_func){ eval(_func); }
  }
}

function mascaraPIS(_obj,_evnt,_func){
  if( !specialKeys(_evnt) ){
    _obj.value = formataPIS(_obj.value);
    if(_func){ eval(_func); }
  }
}

function mascaraCNPJ(_obj,_evnt,_func){
  if( !specialKeys(_evnt) ){
    _obj.value = formataCNPJ(_obj.value);
    if(_func){ eval(_func); }
  }
}

function mascaraTEL(_obj,_evnt,_func){
  if( !specialKeys(_evnt) ){
    _obj.value = formataTEL(_obj.value);
    if(_func){ eval(_func); }
  }
}

function mascaraRG(_obj,_evnt,_func){
  if( !specialKeys(_evnt) ){
    _obj.value = formataRG(_obj.value);
    if(_func){ eval(_func); }
  }
}

function mascaraMatricula(_obj,_evnt,_func){
  if( !specialKeys(_evnt) ){
    _obj.value = formataMatricula(_obj.value);
    if(_func){ eval(_func); }
  }
}
// ----------------------------------------------------------------------------------------------- //

function formataFloat(_valor,_desc){
  _valor = String(_valor);
  var i;
  var output = '0';
  if(!_desc){ _desc = 10; }
  for(i=1; i<_desc; i++){ output += '0'; }
  var tmp = _valor.replace(',','');
  output += tmp.replace(/\./g,'');
  var tam = output.length;
  var tamdes = (tam-_desc);
  var p1  = output.substr(0,tamdes);
  var p2  = output.substr(tamdes,_desc);
  p1 = p1.replace(/^0*/g,"");
  p1 = (p1=='')?'0':p1;
  if(_desc > 0){ _valor = p1+','+p2; }else{ _valor = p1; }
  return _valor;
}

function formataMoeda(_valor,_desc){
    if(!_desc){ _desc = 2; }
  _valor = formataFloat(_valor,_desc);
  var i;
  var tmp = _valor.replace(/\./g,'');
  var partes = tmp.split(',');
  var output = '';
  var tres = 0;
  for(i = partes[0].length-1; i>=0; i--){
    if(tres==3){
      output = '.'+output;
      tres = 0;
    }
    output = partes[0].substr(i,1) + output;
    tres++;
  }
  if(partes[1]){
    output += ','+partes[1];
  }
  return output;
}

function desformataMoeda(_valor){
    return parseFloat(_valor.replace(/\./g,'').replace(/\,/g,'.')) * 100;
}

function formataData(_valor){
  var i;
  var tmp = _valor.replace(/\D/g,'');
  var output='';
  for(i = 0; i < tmp.length;i++){
    if(i==2){ output += '/'; }
    if(i==4){ output += '/'; }
    output += tmp.substr(i,1);
  }
  return output;
}

function formataCEP(_cep){
  var i;
  var tmp = _cep.replace(/\D/g,'');
  var output='';
  for(i = 0; i < tmp.length;i++){
    if(i==5){ output += '-'; }
    output += tmp.substr(i,1);
  }
  return output;
}

function formataPORCENTO(_valor,_desc){
    if(!_desc){ _desc = 2; }
  _valor = formataFloat(_valor,_desc);
  var i;
  var tmp = _valor.replace(/\./g,'');
  var partes = tmp.split(',');
  var output = '';
  var tres = 0;
  for(i = partes[0].length-1; i>=0; i--){
    if(tres==4){
      output = '.'+output;
      tres = 0;
    }
    output = partes[0].substr(i,1) + output;
    tres++;
  }
  if(partes[1]){
    output += ','+partes[1];
  }
  return output;
}

function formataCPF(_cpf){
  var i;
  var tmp = _cpf.replace(/\D/g,'');
  var output='';
  for(i = 0; i < tmp.length;i++){
    if(i==3){ output += '.'; }
    if(i==6){ output += '.'; }
    if(i==9){ output += '-'; }
    output += tmp.substr(i,1);
  }
  return output;
}
function formataPIS(_pis){
  var i;
  var tmp = _pis.replace(/\D/g,'');
  var output='';
  for(i = 0; i < tmp.length;i++){
    if(i==3){ output += '.'; }
    if(i==8){ output += '.'; }
    if(i==10){ output += '-'; }
    output += tmp.substr(i,1);
  }
  return output;
}
// 63.028.476/0001-50
function formataCNPJ(_cnpj){
  var i;
  var tmp = _cnpj.replace(/\D/g,'');
  var output='';
  for(i = 0; i < tmp.length;i++){
    if(i==2){  output += '.'; }
    if(i==5){  output += '.'; }
    if(i==8){ output += '/'; }
    if(i==12){ output += '-'; }
    output += tmp.substr(i,1);
  }
  return output;
}

function formataTEL(_tel){
  var i;
  var tmp = _tel.replace(/\D/g,'');
  var output='';
  if(tmp.length > 2){ output = '('; }
  for(i = 0; i < tmp.length;i++){
    if(i==2){  output += ')'; }
    if(i==6){  output += '-'; }
    output += tmp.substr(i,1);
  }
  return output;
}

function formataRG(_rg){
  var i;
  var tmp = _rg.replace(/\W/g,'');
  var output = '';
  var tres = 0;
  for(i=(tmp.length-1); i>=0; i--){
    if(i==(tmp.length-2)){ output = '-'+output; tres=0; }
    if(tres%3==0 && tres>0){ output = '.'+output; }
    output = tmp.substr(i,1)+output;
    tres++;
  }
  return output;
    return _rg;
}

function formataMatricula(_matr){
  var i;
  var tmp = _matr.replace(/\W/g,'');
  var output = '';
  var tres = 0;
  for(i=(tmp.length-1); i>=0; i--){
    if(i==(tmp.length-2)){ output = '-'+output; tres=0; }
    if(tres%3==0 && tres>0){ output = '.'+output; }
    output = tmp.substr(i,1)+output;
    tres++;
  }
  return output;
}

// ----------------------------------------------------------------------------------------------- //

function teclasIntMedida(_obj,_evnt){
    if (document.all){ var evnt = window.event; x=evnt.keyCode; }
    else{ x=_evnt.keyCode; }
    if( (x >= 48 && x <= 57) || (x >= 96 && x <= 105) || x == 188 || x == 110){
      //   0 a 9
      return true;
    }else if(x == 8 || x == 9 || x == 46 || x == 13){
      //   BACKSPACE ou TAB ou DELETE ou ENTER
      return true;
    }else if(x == 35 || x == 36){
      //   HOME ou END
      return true;
    }else if(x >= 37 && x <= 40){
      //   setas
      return true;
    }
    return false;
}


function teclasInt(_obj,_evnt){
    if (document.all){ var evnt = window.event; x=evnt.keyCode; }
    else{ x=_evnt.keyCode; }

    if( (x >= 48 && x <= 57) || (x >= 96 && x <= 105) ){
      //   0 a 9
      return true;
    }else if(x == 8 || x == 9 || x == 46 || x == 13){
      //   BACKSPACE ou TAB ou DELETE ou ENTER
      return true;
    }else if(x == 35 || x == 36){
      //   HOME ou END
      return true;
    }else if(x >= 37 && x <= 40){
      //   setas
      return true;
    }
    return false;
}

function teclasFloat(_obj,_evnt){
    if (document.all){ var evnt = window.event; x=evnt.keyCode; }
    else{ x=_evnt.keyCode; }
    
    var statusMascara = 0;
    if( _obj.value.match(',') ){ statusMascara = 1; }
    if( (x >= 48 && x <= 57) || (x >= 96 && x <= 105) ){
      //   0 a 9
      return true;
    //}else if(x == 110 || x == 188 || x == 194 || x == 190){
    }else if(x == 110 || x == 188){
      //   , ou .
      if(_obj.value.length > 0){
        if(statusMascara==0){ return true; }
      }
    }else if(x == 8 || x == 9 || x == 46 || x == 13){
      //   BACKSPACE ou TAB ou DELETE ou ENTER
      return true;
    }else if(x == 35 || x == 36){
      //   HOME ou END
      return true;
    }else if(x >= 37 && x <= 40){
      //   setas
      return true;
    }
    return false;
}

function specialKeys(_evnt){
  if (document.all){ var evnt = window.event; x=evnt.keyCode; }
  else{ x=_evnt.keyCode; }

  if(x==9 || x == 35 || x == 36){
      return true;
  }else if(x >= 37 && x <= 40){
      return true;
  }
  return false;
}

function teclasRG(_obj,_evnt){
    if (document.all){ var evnt = window.event; x=evnt.keyCode; }
    else{ x=_evnt.keyCode; }

    if( (x >= 48 && x <= 57) || (x >= 96 && x <= 105) ){
      //   0 a 9
        return true;
    }else if( x >= 65 && x <= 90 ){
        //   A a Z
        return true;
    }else if( x == 194 || x == 190 || x == 109 ){
        //   . ou -
        return true;
    }else if(x == 8 || x == 9 || x == 46 || x == 13){
      //   BACKSPACE ou TAB ou DELETE ou ENTER
      return true;
    }else if(x == 35 || x == 36){
      //   HOME ou END
      return true;
    }else if(x >= 37 && x <= 40){
      //   setas
      return true;
    }
    return false;
}

function teclasMatricula(_obj,_evnt){
    if (document.all){ var evnt = window.event; x=evnt.keyCode; }
    else{ x=_evnt.keyCode; }
        var myRE = new RegExp("x", "i");

    if( (x >= 48 && x <= 57) || (x >= 96 && x <= 105) ){
      //   0 a 9
            if( !_obj.value.match(myRE) ){
            return true;
            }
    //}else if( x >= 65 && x <= 90 ){ //   a-z
    }else if( x == 88 ){ //   x
            if( !_obj.value.match(myRE) ){
            return true;
            }
    }else if(x == 8 || x == 9 || x == 46 || x == 13){
      //   BACKSPACE ou TAB ou DELETE ou ENTER
      return true;
    }else if(x == 35 || x == 36){
      //   HOME ou END
      return true;
    }else if(x >= 37 && x <= 40){
      //   setas
      return true;
    }
    return false;
}

// ----------------------------------------------------------------------------------------------- //

function vVazio(_id){
  if(!existObj(_id)) return false;
  if(trim(document.getElementById(_id).value)==''){
    return true;
  }
  return false;
}

function vTexto(_id,_titulo,_hidemsg){
  if(!existObj(_id)) return false;
  if(vVazio(_id)){
    if(!_hidemsg){
            if(!_titulo) alert('Por favor, preencha o campo!');
            else alert('Por favor, informe '+_titulo+'!');
        foco(_id);
    }
    return false;
  }
  return true;
}

function vNumerico(_id,_titulo){
  if(!vTexto(_id,_titulo)) return false;
    var valor = document.getElementById(_id).value
    valor = valor.replace(/\./g,'');
  if( isNaN(valor) ){
        if(!_titulo) _titulo = 'O Campo';
    alert(_titulo+' deve ser numérico!');
    foco(_id);
    return false;
  }
  return true;
}

function vFNumerico(_id,_titulo){ // float (1.000.000,00)
  if(!vTexto(_id,_titulo)) return false;
    var valor = document.getElementById(_id).value
    valor = valor.replace(/\./g,'');
    valor = valor.replace(/\,/g,'.');
  if( isNaN(valor) ){
        if(!_titulo) _titulo = 'O Campo';
    alert(_titulo+' deve ser numérico!');
    foco(_id);
    return false;
  }
  return true;
}

function vPositivo(_id,_titulo){
  if(!vNumerico(_id,_titulo)) return false;
    var valor = document.getElementById(_id).value
    valor = valor.replace(/\./g,'');
  if( parseInt(valor) <= 0 ){
    if(!_titulo) _titulo = 'O Campo';
    alert(_titulo+' deve ser maior que zero!');
    foco(_id);
    return false;
  }
  return true;
}

function vFPositivo(_id,_titulo,_hidemsg){ // float (1.000.000,00)
  if(!vFNumerico(_id,_titulo)) return false;
    var valor = document.getElementById(_id).value
    valor = valor.replace(/\./g,'');
    valor = valor.replace(/\,/g,'.');
  if( parseFloat(valor) <= 0 ){
    if(!_titulo) _titulo = 'O Campo';
    if(!_hidemsg){
        alert(_titulo+' deve ser maior que zero!');
        foco(_id);
    }
    return false;
  }
  return true;
}

function vMoeda(_id,_titulo){
    if(!vTexto(_id)) return false;
    var valor = document.getElementById(_id).value
    valor = valor.replace(/\./g,'');
    valor = valor.replace(/\,/g,'.');
  if( parseFloat(valor) <= 0 ){
    if(!_titulo) _titulo = 'O Campo';
    alert(_titulo+' deve ser maior que zero!');
    foco(_id);
    return false;
  }
  return true;
}

function vQtde(_id,_msg){
    var qtde = parseInt(document.getElementById(_id).value);
  if( qtde <= 0 ){
    alert(_msg);
    return false;
  }
  return true;
}

function vSelect(_id,_crit,_titulo){
  if(!existObj(_id)) return false;
  var objSel = document.getElementById(_id);
  if(objSel.options[objSel.selectedIndex].value == _crit){
    if(!_titulo) alert('Selecione uma opção!');
        else alert('Por favor, informe '+_titulo+'!');
    foco(_id);
    return false;
  }
  return true;
}

function vCheck(_name,_titulo,_altMsg){
  var i,optID;
  var checkeds = false;
  var opts = document.getElementsByTagName('input');
  for(i=0; i<opts.length; i++){
    if(opts[i].name==_name){
      optID=opts[i].id;
      if(opts[i].checked){ checkeds = true; }
    }
  }
  if(!checkeds){
    if(_altMsg){
        alert(_altMsg);
    }else{
        if(!_titulo) alert('Por favor, escolha uma das opções!');
            else alert('Por favor, informe '+_titulo+'!');
    }
    foco(optID);
    return false;
  }
  return true;
}

function vData(_id,_titulo,_hidemsg){

  if(!vTexto(_id,_titulo,_hidemsg)) return false;
  if(!vDataStr(document.getElementById(_id).value)){
    if(!_hidemsg){
            if(!_titulo) alert('Informe uma data válida!');
        else alert(_titulo+' não é uma data válida!');
        foco(_id);
    }
    return false;
  }
  return true;
}

function vCheckBox(_id,_titulo,_hidemsg){
  if(!vDataStr(document.getElementById(_id).value)){
document.getElementById(_id).value=dataHoje();
  }
return true;
}

function vIdade(_dtNasc,_min,_titulo,_dtCalc){
    var titulo = (_titulo)?_titulo:'';
    var dNas = (_dtNasc)?document.getElementById(_dtNasc).value:DATA_ATUAL;
    var vAtu = (_dtCalc)?document.getElementById(_dtCalc).value:DATA_ATUAL;
    if(getIdade(dNas,vAtu)<_min){
        alert(titulo+' não pode ser menor que '+_min+' anos');
        if(_dtCalc) foco(_dtCalc); return false;
        if(_dtNasc) foco(_dtNasc); return false;
    }
    return true;
}

function comparaDatasId(_d1,_d2){
    var vD1 = (_d1)?document.getElementById(_d1).value:DATA_ATUAL;
    var vD2 = (_d2)?document.getElementById(_d2).value:DATA_ATUAL;
    return comparaDatas(vD1,vD2);
}

function vCPF(_id,_titulo) {
  if(!vTexto(_id,_titulo)) return false;
  var cpfText = document.getElementById(_id).value;
  if(!Verify(cpfText, 'CPF')){
    if(!_titulo) alert('Informe um CPF válido!');
    else alert(_titulo+' não é válido!');
    foco(_id);
    return false;
  }
  return true;
}

function vCNPJ(_id,_titulo) {
  if(!vTexto(_id,_titulo)) return false;
  var cpfText = document.getElementById(_id).value;
  if(!Verify(cpfText, 'CNPJ')){
    if(!_titulo) alert('Informe um CNPJ válido!');
    else alert(_titulo+' não é válido!');
    foco(_id);
    return false;
  }
  return true;
}

function vCEP(_id,_titulo){
  if(!vTexto(_id,_titulo)) return false;
  if(document.getElementById(_id).value.length < 9){
    if(!_titulo) alert('Informe um CEP válido!');
    else alert(_titulo+' não é válido!');
    foco(_id);
    return false;
  }
  return true;
}

function vEmail(_id,_titulo){
  if(!vTexto(_id,_titulo)) return false;
    var reg1 = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/i;
    var reg2 = /\.\./i;
    var endereco = document.getElementById(_id).value;
    if (!endereco.match(reg1) || endereco.match(reg2)) {
    if(!_titulo) alert('Informe um Email válido!');
    else alert(_titulo+' não é válido!');
    foco(_id);
    return false;
  }
  return true;
}

function vTelefone(_id,_titulo){
  if(!vTexto(_id,_titulo)) return false;
    var reg1 = /^\(\d{2}\)\d{4}\-\d{4}$/i;
    var telefone = document.getElementById(_id).value;
    if( !telefone.match(reg1) ) {
    if(!_titulo) alert('Informe um Telefone válido!');
    else alert(_titulo+' não é válido!');
    foco(_id);
    return false;
  }
  return true;
}

function vSenhas(_id1,_id2) {
  if(!vTexto(_id1)) return false;
  if(!vTexto(_id2)) return false;
  var senha1 = trim(document.getElementById(_id1).value);
  var senha2 = trim(document.getElementById(_id2).value);
  if(senha1!=senha2){
    alert('As senhas estão diferentes!');
    foco(_id1);
    return false;
  }
  return true;
}

function vRG(_id,_titulo){
  if(!vTexto(_id,_titulo)) return false;
  return true;
}

function vMatricula(_id){
  if(!vTexto(_id)) return false;
    var reg1 = /^\d{2}\.\d{3}\.\d{3}\-[0-9x]$/i;
    var matricula = document.getElementById(_id).value;
    if( !matricula.match(reg1) ) {
    alert('Matricula inválida!');
    foco(_id);
    return false;
  }
  return true;
}

// ----------------------------------------------------------------------------------------------- //

function trim(_text){
  return _text.replace(/^\s*|\s*$/g,"");
}

function existObj(_id){
  if( document.getElementById(_id) ){
    return true;
  }else{
    alert('objeto "'+_id+'" nao existe');
    return false;
  }
}

function foco(_id){ document.getElementById(_id).focus(); }

// ----------------------------------------------------------------------------------------------- //

function ClearStr(str, char) {
  while((cx=str.indexOf(char))!=-1) {       
    str = str.substring(0,cx)+str.substring(cx+1);
  }
  return(str);
}

function ParseNumb(c) {
  c=ClearStr(c,"-");
  c=ClearStr(c,"/");
  c=ClearStr(c,",");
  c=ClearStr(c,".");
  c=ClearStr(c,"(");
  c=ClearStr(c,")");
  c=ClearStr(c," ");
  if((parseFloat(c) / c != 1)) {
    if(parseFloat(c) * c == 0) { return(c); }else{ return(0); }
  }else{ return(c); }
  return(c);
}

function Verify(CNUMB,CTYPE) {
  CNUMB=ParseNumb(CNUMB)
  if(CNUMB == 0) {
    return(false);
  }else{
    g=CNUMB.length-2;
    if(TestDigit(CNUMB,CTYPE,g)){
      g=CNUMB.length-1;
      if(TestDigit(CNUMB,CTYPE,g)){ return(true); }
      else{ return(false); }
    }else{
      return(false);
    }
  }
}

function TestDigit(CNUMB,CTYPE,g) {
  var dig=0;
  var ind=2;
  for(f=g;f>0;f--){
    dig+=parseInt(CNUMB.charAt(f-1))*ind;
    if (CTYPE=='CNPJ') { if(ind>8) {ind=2} else {ind++} }
    else { ind++ }
  }
  dig%=11;
  if(dig<2){ dig=0; }else{ dig=11-dig; }
  if(dig!=parseInt(CNUMB.charAt(g))) { return(false); }
  else { return(true); }
}

// ----------------------------------------------------------------------------------------------- //

function valorRadio(_name){
    var valor='';
  var i,optID;
  var checkeds = false;
  var opts = document.getElementsByTagName('input');
  for(i=0; i<opts.length; i++){
    if(opts[i].name==_name){
      optID=opts[i].id;
      if(opts[i].checked){ valor = opts[i].value; }
    }
  }
  return valor;
}

function valorSelect(_id){
  if(!existObj(_id)) return false;
  var objSel = document.getElementById(_id);
  return objSel.options[objSel.selectedIndex].value;
}

function limpaText(_id){
  if(!existObj(_id)) return false;
  document.getElementById(_id).value='';
  return true;
}


// ----------------------------------------------------------------------------------------------- //

function comparaDatas(_d1,_d2){
    // formato: dd/mm/yyyy
    if(!vDataStr(_d1)) return 0;
    if(!vDataStr(_d2)) return 0;
    
    var p = Array();
    p = _d1.split('/');
    var t1 = parseInt(p[2]+''+p[1]+''+p[0]);
    p = _d2.split('/');
    var t2 = parseInt(p[2]+''+p[1]+''+p[0]);
    
    //alert(t1+' - '+t2);
    if(t1 > t2) return 1;
    else if(t1 < t2) return 3;
    else return 2;
}

function getIdade(_dNas,_dAtu){
    // formato: dd/mm/yyyy
    if(!vDataStr(_dNas)) return 0;
    if(!vDataStr(_dAtu)) return 0;
    
    var p = Array();
    p = _dNas.split('/');
    var d1 = parseInt(p[2]+''+p[1]+''+p[0]);
    p = _dAtu.split('/');
    var d2 = parseInt(p[2]+''+p[1]+''+p[0]);

    var idade = parseInt((d2 - d1)/10000);
    return idade;
}

function vDataStr(_str){
  if(vVazioStr(_str)) return false;
  var reDate = /^((0?[1-9]|[12]\d)\/(0?[1-9]|1[0-2])|30\/(0?[13-9]|1[0-2])|31\/(0?[13578]|1[02]))\/(19|20)\d{2}$/;
  textData = _str.replace(/\-/g,'/');
  if(!textData.match(reDate) ){
    return false;
  }
  return true;
}

function vVazioStr(_str){
  return (trim(_str)=='');
}

function atualizaIdade(_data,_span){
    var dt = document.getElementById(_data).value;
    if(vDataStr(dt)){
        var idade = getIdade(dt,DATA_ATUAL);
        document.getElementById(_span).innerHTML = '('+idade+' anos)';
    }else{
        document.getElementById(_span).innerHTML = '';
    }
}


