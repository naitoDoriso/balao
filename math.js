function BigMult(s, t){
    let dig = [];
    let r = 0;

    for (let i=0; i<s.length+t.length-1; i++) dig[i] = 0;

    for (let i=0; i<s.length; i++){
        for (let j=0; j<t.length; j++){
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

function BigPow(b, e){
	let ans = "1";
	let i = "0";

	while (i != e){
		ans = BigMult(ans, b);
		i = BigInc(i);
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
