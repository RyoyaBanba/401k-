/*目的:401k加入状況を管理するためのコード。加入状況管理については従業員管理アプリ中のフィールド「401k加入有無」で行っており、「有」は加入者、「無」は未加入者である。
このプログラムにより、新規加入FBを送信すると「401k加入有無」が「無」から「有」に変更される。

適用先フォームブリッジ(管理画面)、アプリのURLは以下
1.フォームブリッジのURL: https://formbridge.kintoneapp.com/recipe/396685/show/
3.アプリのURL: https://nkr-group.cybozu.com/k/guest/389/3526/
開発のgoogleアカウント:robo-pat@nkr-group.com
*/

(function () {
  "use strict";
  fb.events.form.created = [
    function (state) {
      state.record._401k加入有無.value = "有";
      return state;
    },
  ];
})();
