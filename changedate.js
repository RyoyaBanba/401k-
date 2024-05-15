/*作成日:2024-02-07
  作成者:馬場諒弥
  更新日:2024-02-07
  最終更新者:馬場諒弥

ステータス:完成
目的:401kの掛金変更日を、今日の日付に合わせて自動的に出力するプログラム。
毎月1～15日までに申し込みをすると翌月1日加入、それ以降に申し込むと翌々月1日加入になるのが原則であるため、掛金変更日もそれに合わせて自動的に決まる。
*/

function dateformat(time) {
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var date = time.getDate();

  //掛金変更日の自動計算
  if (date < 16) {
    if (month == 1) {
      var total = "2/1";
    } else if (month == 2) {
      var total = "3/1";
    } else if (month == 3) {
      var total = "4/1";
    } else if (month == 4) {
      var total = "5/1";
    } else if (month == 5) {
      var total = "6/1";
    } else if (month == 6) {
      var total = "7/1";
    } else if (month == 7) {
      var total = "8/1";
    } else if (month == 8) {
      var total = "9/1";
    } else if (month == 9) {
      var total = "10/1";
    } else if (month == 10) {
      var total = "11/1";
    } else if (month == 11) {
      var total = "12/1";
    } else {
      var total = "1/1";
    }
  } else {
    if (month == 1) {
      var total = "3/1";
    } else if (month == 2) {
      var total = "4/1";
    } else if (month == 3) {
      var total = "5/1";
    } else if (month == 4) {
      var total = "6/1";
    } else if (month == 5) {
      var total = "7/1";
    } else if (month == 6) {
      var total = "8/1";
    } else if (month == 7) {
      var total = "9/1";
    } else if (month == 8) {
      var total = "10/1";
    } else if (month == 9) {
      var total = "11/1";
    } else if (month == 10) {
      var total = "12/1";
    } else if (month == 11) {
      var total = "1/1";
    } else {
      var total = "2/1";
    }
  }
  return total;
}

//自動計算した掛金変更日をFBへ反映
let now = new Date();
(function () {
  "use strict";
  fb.events.form.created = [
    function (state) {
      state.record.変更日401k.value = dateformat(now);
      return state;
    },
  ];
})();
