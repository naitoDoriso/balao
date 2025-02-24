function BigMult(s, t){
    let dig = [];
    let r = 0;

    for (let i=0; i<s.length+t.length-1; i++) dig[i] = 0;

    for (let i=s.length-1; i>=0; i--){
        for (let j=t.length-1; j>=0; j--){
            dig[i+j] += (s[i]-0)*(t[j]-0);
            if (dig[i+j] > 9){
            	if (i+j == 0) r += parseInt(dig[i+j]/10);
            	else dig[i+j-1] += parseInt(dig[i+j]/10);
            	dig[i+j] %= 10;
            }
        }
    }

    if (r > 0){
    	dig.push(0);
    	for (let i=dig.length-1; i>=1; i--) dig[i] = dig[i-1];
    	dig[0] = r;
    }

    return dig.join("");
}

function BigInc(s){
	let dig = [];
	let i = 0;
	for (i=0; i<s.length; i++) dig[i] = s[i]-'0';

	dig[--i]++;

	let r = 0;
	while (i >= 0 && dig[i] > 9){
		if (i == 0) r += parseInt(dig[i]/10);
		else dig[i-1] += parseInt(dig[i]/10);
		dig[i--] %= 10;
	}

	if (r > 0){
		dig.push(0);
		for (i=dig.length-1; i>=1; i--) dig[i] = dig[i-1];
		dig[0] = r;
	}

	return dig.join("");
}

function BigDivInt(s, n){
	let dig = [];
	for (let i=0; i<s.length; i++) dig[i] = 0;

	for (let i=0; i<s.length; i++) {
		dig[i] += (s[i]-'0')/n;
		if (i < s.length-1) dig[i+1] += (dig[i]%1)*10;
		dig[i] = parseInt(dig[i]);
	}
	while(dig.length > 1 && dig[0] == 0) {
		dig.splice(0,1);
	}
	return dig.join("");
}

function BigPar(s){
	return (s[s.length-1]-'0')%2;
}

function cmp(s, t){
	let ans = '';
	if (s.length < t.length) ans = '<';
	else if (s.length > t.length) ans = '>';
	else if (s.length == t.length){
		let eq = true;
		for (let i=0; i<s.length; i++){
			if (s[i] != t[i]) {
				if (s[i] < t[i]) ans = '<';
				else if (s[i] > t[i]) ans = '>';
				eq = false;
				break;
			}
		}
		if (eq) ans = '=';
	}
	return ans;
}

function BigPow(b, e){
	let ans = "1";

	while (cmp(e,"0") == '>'){
		if (BigPar(e) != 0) ans = BigMult(ans, b);
		b = BigMult(b, b);
		e = BigDivInt(e,2);
	}

	return ans;
}

function BigPrint(s){
	let ans = "";
	for (let i=0; i<s.length; i++){
		if (i>0 && (s.length-i)%3 == 0) ans += ".";
		ans += s[i];
	}
	return ans;
}

function BigNotation(s, n, bnot=false){
	let ans = s[0]+',';
	for (let i=1; i<=n && i<s.length; i++) ans += s[i];
	if (!bnot) ans += " · 10<sup>"+(s.length-1)+"</sup>";
	else ans += " · 10<sup>"+( BigPrint( (s.length-1).toString() ) )+"</sup>";
	return ans;
}
