/*作成日:2022-01-30
  作成者:沢田一磨
  更新日:2024-02-07
  最終更新者:馬場諒弥

ステータス:完成
目的:401kのフォームブリッジに入力された情報をアプリ内のテーブルに追加することで履歴として一覧化するプログラム。ここでは、手続き名が喪失の場合のみに適用している。

適用先フォームブリッジ(管理画面)、アプリのURLは以下
1.フォームブリッジのURL: https://formbridge.kintoneapp.com/recipe/396691/show/
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
      state.record.喪失401k.value.push({
        value: {
          連絡日時喪失: { value: "" },
          退職理由喪失: { value: "" },
          資格喪失日喪失: { value: "" },
          提出書類喪失: { value: "" },
          備考喪失: { value: "" },
          手続き喪失: { value: "" },
        },
      });
    },
  ];
  //以下は,フォームブリッジのフォームセルのデータを各変数に代入し,指定されたテーブルに格納する。
  fb.events.form.confirm = [
    function (state) {
      let Now = moment().format("YYYY-MM-DD HH:mm"); //moment関数を使用する際は,moment.jsを使用する
      //FBで実際に回答する項目のフィールドコードを指定し、変数に格納
      let lost = [
        Now,
        state.record.退職理由.value,
        state.record.資格喪失年齢到達予定日.value,
        state.record.備考喪失.value,
      ];
      let Status = state.record.ステータス5.value;
      //日付データを変換
      let Loss_date = new Date(state.record.資格喪失年齢到達予定日.value);
      //各テーブルにおけるテーブルの長さを取得
      let lostcount = state.record.喪失401k.value.length;

      //以下の処理の注意事項：ステータス401kはドロップダウン式なので代入するものはアプリのドロップダウン内の項目のどれかを入れる必要がある。それ以外の値などを代入するとエラーになる。
      if (Status == "喪失") {
        //-2はブランクレコードの表示を防ぐため。新規加入後の手続きを想定しているのでテーブルの長さは2になる。
        if (
          state.record.喪失401k.value[lostcount - 2].value.連絡日時喪失.value ==
          ""
        ) {
          state.record.喪失401k.value[lostcount - 2].value.連絡日時喪失.value =
            lost[0];
          state.record.喪失401k.value[lostcount - 2].value.退職理由喪失.value =
            lost[1];
          state.record.喪失401k.value[
            lostcount - 2
          ].value.資格喪失日喪失.value = dateform(Loss_date);
          state.record.喪失401k.value[lostcount - 2].value.備考喪失.value =
            lost[3];
        } else {
          state.record.喪失401k.value[lostcount - 1].value.連絡日時喪失.value =
            lost[0];
          state.record.喪失401k.value[lostcount - 1].value.退職理由喪失.value =
            lost[1];
          state.record.喪失401k.value[
            lostcount - 1
          ].value.資格喪失日喪失.value = dateform(Loss_date);
          state.record.喪失401k.value[lostcount - 1].value.備考喪失.value =
            lost[3];
        }
      }
    },
  ];

  fb.events.confirm.submit = [
    function (state) {
      let lostcount = state.record.喪失401k.value.length;

      if (
        state.record.喪失401k.value[lostcount - 1].value.連絡日時喪失.value ==
        ""
      ) {
        state.record.喪失401k.value.pop({
          value: {
            連絡日時喪失: { value: "" },
            退職理由喪失: { value: "" },
            資格喪失日喪失: { value: "" },
            提出書類喪失: { value: "" },
            備考喪失: { value: "" },
            手続き喪失: { value: "" },
          },
        });
      }
    },
  ];
})();
