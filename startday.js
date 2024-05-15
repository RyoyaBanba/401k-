/*作成日:2024-04-06
  最終更新者:馬場諒弥

  ステータス:完成

目的:401k新規加入者が加入資格を得る日(資格取得日)を自動計算するプログラム。
従業員からのFBで記録されたテーブルについて、手続き状況を手続き済みとすると、資格取得日が自動計算される。

注意・メモ:
1. 通常の資格取得日だけではなく、指定日以降の資格取得日にも対応している。
2. テーブルが複数行送られてきている場合、手続き状況をすべて『手続き済み』にしないと、資格取得日がブランクになってしまう。
*/

(() => {
  "use strict";

  kintone.events.on(["app.record.edit.submit"], (event) => {
    const record = event.record;
    var start = record.加入401k.value[0].value.資格取得開始日.value;
    var start2 = record.加入401k.value[0].value.指定日以降資格取得開始日.value;
    var proceed = record.加入401k.value[0].value.手続き加入.value;

    //指定日以降の資格取得日があるかどうかで場合分け
    if (proceed == "手続き済み" && start2 == null) {
      record.資格取得日.value = start;
      return event;
    } else if (proceed == "手続き済み" && start2 != null) {
      record.資格取得日.value = start2;
      return event;
    } else {
      return event;
    }
  });
})();
