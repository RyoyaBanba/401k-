/*作成日:2022-01-30
  作成者:沢田一磨
  更新日:2024-02-07
  最終更新者:馬場諒弥

ステータス:完成
目的:401kのフォームブリッジに入力された情報をアプリ内のテーブルに追加することで履歴として一覧化するプログラム。ここでは、手続き名が掛金変更の場合のみに適用している。

適用先フォームブリッジ(管理画面)、アプリのURLは以下
1.フォームブリッジのURL: https://formbridge.kintoneapp.com/recipe/396694/show/
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
  fb.events.kviewer.record.mapped = [
    function (state) {
      state.record.掛金変更401k.value.push({
        value: {
          連絡日時掛金変更: { value: "" },
          掛金変更日: { value: "" },
          本人拠出額掛金変更: { value: "" },
          法人拠出額掛金変更: { value: "" },
          指定日以降掛金変更日: { value: "" },
          備考掛金変更: { value: "" },
          手続き掛金変更: { value: "" },
        },
      });
    },
  ];
  //以下は,フォームブリッジのフォームセルのデータを各変数に代入し,指定されたテーブルに格納する。
  fb.events.form.confirm = [
    function (state) {
      let Now = moment().format("YYYY-MM-DD HH:mm"); //moment関数を使用する際は,moment.jsを使用する
      //FBで実際に回答する項目のフィールドコードを指定し、変数に格納
      let change = [
        Now,
        state.record.変更日401k.value,
        state.record.本人拠出額変更後の金額.value,
        state.record.掛金変更後の金額.value,
        state.record.指定日以降掛金変更日.value,
        state.record.備考掛金変更.value,
      ];
      let Status = state.record.ステータス5.value;
      //日付データを変換
      let Change_date = new Date(state.record.変更日401k.value);
      //各テーブルにおけるテーブルの長さを取得
      let changecount = state.record.掛金変更401k.value.length;

      //以下の処理の注意事項：ステータス401kはドロップダウン式なので代入するものはアプリのドロップダウン内の項目のどれかを入れる必要がある。それ以外の値などを代入するとエラーになる。
      if (Status == "掛金変更") {
        if (
          state.record.掛金変更401k.value[changecount - 2].value
            .連絡日時掛金変更.value == ""
        ) {
          state.record.掛金変更401k.value[
            changecount - 2
          ].value.連絡日時掛金変更.value = change[0];
          state.record.掛金変更401k.value[
            changecount - 2
          ].value.掛金変更日.value = change[1];
          state.record.掛金変更401k.value[
            changecount - 2
          ].value.本人拠出額掛金変更.value = change[2];
          state.record.掛金変更401k.value[
            changecount - 2
          ].value.法人拠出額掛金変更.value = change[3];
          state.record.掛金変更401k.value[
            changecount - 2
          ].value.指定日以降掛金変更日.value = change[4];
          state.record.掛金変更401k.value[
            changecount - 2
          ].value.備考掛金変更.value = change[5];
        } else {
          state.record.掛金変更401k.value[
            changecount - 1
          ].value.連絡日時掛金変更.value = change[0];
          state.record.掛金変更401k.value[
            changecount - 1
          ].value.掛金変更日.value = change[1];
          state.record.掛金変更401k.value[
            changecount - 1
          ].value.本人拠出額掛金変更.value = change[2];
          state.record.掛金変更401k.value[
            changecount - 1
          ].value.法人拠出額掛金変更.value = change[3];
          state.record.掛金変更401k.value[
            changecount - 1
          ].value.指定日以降掛金変更日.value = change[4];
          state.record.掛金変更401k.value[
            changecount - 1
          ].value.備考掛金変更.value = change[5];
        }
      }
    },
  ];

  fb.events.confirm.submit = [
    function (state) {
      let changecount = state.record.掛金変更401k.value.length;
      if (
        state.record.掛金変更401k.value[changecount - 1].value.連絡日時掛金変更
          .value == ""
      ) {
        state.record.掛金変更401k.value.pop({
          value: {
            連絡日時掛金変更: { value: "" },
            掛金変更日: { value: "" },
            本人拠出額掛金変更: { value: "" },
            法人拠出額掛金変更: { value: "" },
            指定日以降掛金変更日: { value: "" },
            備考掛金変更: { value: "" },
            手続き掛金変更: { value: "" },
          },
        });
      }
    },
  ];
})();
