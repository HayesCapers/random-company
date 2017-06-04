

$(document).ready(()=>{

	// const suffix = ['s','ed','ing','ly','er','able','ible','ment','ic','ious','ness','ful','less','ity','ty'];
	// const prefix = ['anti','de','dis','en','fore','in','inter','mid','mc','non','pre','semi','sub','re'];

	const vowels = ['a','e','i','o','u'];
	const consonants = ['b','c','d','f','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z'];

	// const baseApiUrl = 'http://words.bighugelabs.com/api/2/';
	const baseApiUrl = 'http://words.bighugelabs.com/api/2/';

	$('#the-form').submit((event)=>{
		event.preventDefault();
		var initialInput = $('.search-input').val();
		var inputArray = initialInput.split(' ');
		var input1 = inputArray[0];
		var input2 = inputArray[1];
		// console.log(input1);
		// console.log(input2);
		var randInt = Math.round(Math.random() * 100);
		// var randomSuffix = suffix[Math.round(Math.random() * suffix.length)];
		// var randomPrefix = prefix[Math.round(Math.random() * prefix.length)];
		var search1 = `${baseApiUrl}${apiKey}/${input1}/json`;
		var search2 = `${baseApiUrl}${apiKey}/${input2}/json`;
		// var searchUrl = `${baseApiUrl}/entries/en/ace`;
		// $.ajax({
		// 	url: 'https://od-api.oxforddictionaries.com:443/api/v1/entries/en/ace',
		// 	headers:{
		// 		'Accept': 'application/json',
		// 		'app_id': '76545d6b',
		// 		'app_key': 'eaf97328fe31dfc68ac9999456bc8259',
		// 	}
		// }).done(function(searchData) {
  // 			console.log(searchData);
		// });


		$.getJSON(search1,(searchData1)=>{
			// console.log(searchData1);
			var synonym1 = pickRandomSyn(searchData1);
			console.log(synonym1);
			var slicedSynonym1 = sliceFirstSyn(synonym1);
			$.getJSON(search2,(searchData2)=>{
				var synonym2 = pickRandomSyn(searchData2);
				console.log(synonym2);
				var slicedSynonym2 = sliceSecondSyn(synonym2);
				// console.log(synonym2);
				// console.log(synonym1);
				var result = '';
				result += slicedSynonym1 + slicedSynonym2;
				$('#results').html(result);
			});
		})
	});

	function pickRandomSyn(data){
		var randomNum = Math.round(Math.random() * data.noun.syn.length);
		var randomSyn = data.noun.syn[randomNum];
		return randomSyn
	}

	function sliceFirstSyn(word){
		var newWord = '';
		for (let i = 3; i < word.length; i++){
			for (let j = 0; j < consonants.length; j++){
				if (consonants[j].indexOf(word[i] != -1)){
					newWord = word.slice(0,i);
					break;
				}
			}
			if (newWord != ''){
				break;
			}
		}
		return newWord;
	}

	function sliceSecondSyn(word){
		var newWord = '';
		for (let i = word.length; i > 0; i--){
			for (let j = 0; j < vowels.length; j++){
				if (vowels[j].indexOf(word[i] != -1)){
					newWord = word.slice(i,word.length);
					break;
				}
			}
			if (newWord != ''){
				break;
			}
		}
		return newWord;
	}

});


