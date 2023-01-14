'use strict'; /*宣言後の記述ミスをエラーとして表示してくれる機能を
            呼び出すための記述
            日本語では「厳格モードを使う」という意味
            安全に開発するために使おう！*/

const userNameInput    = document.getElementById('user-name');
const assessmentBotton = document.getElementById('assessment');
const resultDivided    = document.getElementById('result-area');
const tweetDivided     = document.getElementById('tweet-area');

assessmentBotton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        return;
    }
    
    // 診断結果の表示を消す
    resultDivided.innerText = '';

    // 診断結果を表示させる
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    
    // ツイートエリアも表示を消す
    tweetDivided.innerText = '';

    // ツイートエリアの作成<a>
    const anchor = document.createElement('a');
    const hrefValue = 
        'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ診断') + '&ref_src=twsrc%5Etfw';
    
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ診断';

    tweetDivided.appendChild(anchor);

    // ツイートエリアの作成<script>
    const scrict = document.createElement('script');
    scrict.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(scrict);
}

// Enterキーでもボタンを押したときと同じ動作を実行
userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentBotton.onclick();        
    }
}
            
const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];

/**
 * 名前から診断結果を返す関数
 * @param {string} userName 診断する名前
 * @returns {string} 診断結果
 */
function assessment(userName) {
    //文字のコード番号の合計値を求める
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添え字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replaceAll('{userName}', userName);
    
    return result;
}