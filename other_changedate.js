/*作成日:2024-03-23
  作成者:馬場諒弥
  更新日:2024-03-23
  最終更新者:馬場諒弥

ステータス:完成
目的:毎月1～15日までに申し込みをすると翌月1日掛金変更、それ以降に申し込むと翌々月1日掛金変更になるのが原則であるため、掛金変更日もそれに合わせて自動的に決まる。
しかし、事前に変更手続きをしたいというニーズにこたえるために、それ以降の401k掛金変更希望日の選択肢を決めるプログラムを開発した。
ここでは掛金変更指定月よりも7か月後を選択肢として入れている。

注意・メモ:
1. ７か月というのは、どこまで事前に手続きしたいかというニーズのうち７か月であれば十分だろうという理由で決めております。藤井社長と大谷さんからの合意はある状態です。
２．FBフィールド(指定日以降掛金変更日)は必ず文字列１行にすること(プルダウンにしないこと)。
*/

(function () {
  "use strict";
  fb.events.form.mounted = [
    function (state) {
      const ac = new AttributeControl();
      ac.setAttribute({ 指定日以降掛金変更日: { list: "sample" } });

      //各月において、７か月分の表示内容をdataObjectに格納
      const dataObject1 = [
        { value: "2/1" },
        { value: "3/1" },
        { value: "4/1" },
        { value: "5/1" },
        { value: "6/1" },
        { value: "7/1" },
        { value: "8/1" },
      ];
      const dataObject2 = [
        { value: "3/1" },
        { value: "4/1" },
        { value: "5/1" },
        { value: "6/1" },
        { value: "7/1" },
        { value: "8/1" },
        { value: "9/1" },
      ];
      const dataObject3 = [
        { value: "4/1" },
        { value: "5/1" },
        { value: "6/1" },
        { value: "7/1" },
        { value: "8/1" },
        { value: "9/1" },
        { value: "10/1" },
      ];
      const dataObject4 = [
        { value: "5/1" },
        { value: "6/1" },
        { value: "7/1" },
        { value: "8/1" },
        { value: "9/1" },
        { value: "10/1" },
        { value: "11/1" },
      ];
      const dataObject5 = [
        { value: "6/1" },
        { value: "7/1" },
        { value: "8/1" },
        { value: "9/1" },
        { value: "10/1" },
        { value: "11/1" },
        { value: "12/1" },
      ];
      const dataObject6 = [
        { value: "7/1" },
        { value: "8/1" },
        { value: "9/1" },
        { value: "10/1" },
        { value: "11/1" },
        { value: "12/1" },
        { value: "1/1" },
      ];
      const dataObject7 = [
        { value: "8/1" },
        { value: "9/1" },
        { value: "10/1" },
        { value: "11/1" },
        { value: "12/1" },
        { value: "1/1" },
        { value: "2/1" },
      ];
      const dataObject8 = [
        { value: "9/1" },
        { value: "10/1" },
        { value: "11/1" },
        { value: "12/1" },
        { value: "1/1" },
        { value: "2/1" },
        { value: "3/1" },
      ];
      const dataObject9 = [
        { value: "10/1" },
        { value: "11/1" },
        { value: "12/1" },
        { value: "1/1" },
        { value: "2/1" },
        { value: "3/1" },
        { value: "4/1" },
      ];
      const dataObject10 = [
        { value: "11/1" },
        { value: "12/1" },
        { value: "1/1" },
        { value: "2/1" },
        { value: "3/1" },
        { value: "4/1" },
        { value: "5/1" },
      ];
      const dataObject11 = [
        { value: "12/1" },
        { value: "1/1" },
        { value: "2/1" },
        { value: "3/1" },
        { value: "4/1" },
        { value: "5/1" },
        { value: "6/1" },
      ];
      const dataObject12 = [
        { value: "1/1" },
        { value: "2/1" },
        { value: "3/1" },
        { value: "4/1" },
        { value: "5/1" },
        { value: "6/1" },
        { value: "7/1" },
      ];

      //各月について場合分けでプルダウンの選択肢を出力。例えば、標準変更日が1/1(11/16~12/15に手続きを行った)の場合、2/1~8/1を出力する。
      if (state.record.ステータス5.value == "掛金変更") {
        if (state.record.変更日401k.value == "1/1") {
          ac.update_datalist("sample", dataObject1);
          return state;
        } else if (state.record.変更日401k.value == "2/1") {
          ac.update_datalist("sample", dataObject2);
          return state;
        } else if (state.record.変更日401k.value == "3/1") {
          ac.update_datalist("sample", dataObject3);
          return state;
        } else if (state.record.変更日401k.value == "4/1") {
          ac.update_datalist("sample", dataObject4);
          return state;
        } else if (state.record.変更日401k.value == "5/1") {
          ac.update_datalist("sample", dataObject5);
          return state;
        } else if (state.record.変更日401k.value == "6/1") {
          ac.update_datalist("sample", dataObject6);
          return state;
        } else if (state.record.変更日401k.value == "7/1") {
          ac.update_datalist("sample", dataObject7);
          return state;
        } else if (state.record.変更日401k.value == "8/1") {
          ac.update_datalist("sample", dataObject8);
          return state;
        } else if (state.record.変更日401k.value == "9/1") {
          ac.update_datalist("sample", dataObject9);
          return state;
        } else if (state.record.変更日401k.value == "10/1") {
          ac.update_datalist("sample", dataObject10);
          return state;
        } else if (state.record.変更日401k.value == "11/1") {
          ac.update_datalist("sample", dataObject11);
          return state;
        } else {
          ac.update_datalist("sample", dataObject12);
          return state;
        }
      }
    },
  ];
})();
