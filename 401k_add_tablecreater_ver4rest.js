/*作成日:2022-01-30
  作成者:沢田一磨
  更新日:2024-02-07
  最終更新者:馬場諒弥

ステータス:完成
目的:401kのフォームブリッジに入力された情報をアプリ内のテーブルに追加することで履歴として一覧化するプログラム。ここでは、手続き名が休職育休の場合のみに適用している。

適用先フォームブリッジ(管理画面)、アプリのURLは以下
1.フォームブリッジのURL: https://formbridge.kintoneapp.com/recipe/396695/show/
2.アプリのURL: https://nkr-group.cybozu.com/k/guest/389/3526/
開発のgoogleアカウント:robo-pat@nkr-group.com

注意・メモ:
1. コピペして活用する場合、インデントが揃わなくことある。インデントが整っていないとプログラムが動かなくなる
2. イベント関数を重複させて記述するとエラーになる
  */

//形式の異なる日付の各要素を取得して結合する関数。出力例:2022-12-26
function dateform(time) {
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let date = time.getDate();
  let total = year + "-" + month + "-" + date;
  return total;
}

(function () {
  "use strict";
  /*
      fb.events.kviewer.record.mapped = [function (state){
        state.record.育休休職401k.value.push({
          value:{
            連絡日時育休:{value:''},
            休止する拠出年月:{value:''},
            掛金の停止希望の有無育休:{
              value:['']},
            備考休職:{value:''},
            手続き育休休職:{value:''}
          }
        });
    }];
    */
  //以下は,フォームブリッジのフォームセルのデータを各変数に代入し,指定されたテーブルに格納する。
  fb.events.form.confirm = [
    function (state) {
      let Now = moment().format("YYYY-MM-DD HH:mm"); //moment関数を使用する際は,moment.jsを使用する
      //FBで実際に回答する項目のフィールドコードを指定し、変数に格納
      let rest = [
        Now,
        state.record.休職育休開始日.value,
        state.record.掛金の停止希望の有無.value,
        state.record.備考休職.value,
      ];
      let Status = state.record.ステータス5.value;
      //日付データを変換
      let Mat_leave_start = new Date(state.record.休職育休開始日.value);
      //各テーブルにおけるテーブルの長さを取得
      let restcount = state.record.育休休職401k.value.length;

      //以下の処理の注意事項：ステータス401kはドロップダウン式なので代入するものはアプリのドロップダウン内の項目のどれかを入れる必要がある。それ以外の値などを代入するとエラーになる。
      if (Status == "休職・育休") {
        state.record.育休休職401k.value[
          restcount - 1
        ].value.連絡日時育休.value = rest[0];
        state.record.育休休職401k.value[
          restcount - 1
        ].value.休止する拠出年月.value = dateform(Mat_leave_start);
        state.record.育休休職401k.value[
          restcount - 1
        ].value.掛金の停止希望の有無育休.value = rest[2];
        state.record.育休休職401k.value[restcount - 1].value.備考休職.value =
          rest[3];
      }
    },
  ];

  fb.events.confirm.submit = [
    function (state) {
      let restcount = state.record.育休休職401k.value.length;
      if (
        state.record.育休休職401k.value[restcount - 1].value.連絡日時育休
          .value == ""
      ) {
        state.record.育休休職401k.value.pop({
          value: {
            連絡日時育休: { value: "" },
            休止する拠出年月: { value: "" },
            掛金の停止希望の有無育休: {
              value: ["", ""],
            },
            備考休職: { value: "" },
            手続き育休休職: { value: "" },
          },
        });
      }
    },
  ];
})();
