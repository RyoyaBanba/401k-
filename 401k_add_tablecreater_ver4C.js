/*作成日:2022-01-30
  作成者:沢田一磨
  更新日:2024-02-07
  最終更新者:馬場諒弥

ステータス:完成
目的:401kのフォームブリッジに入力された情報をアプリ内のテーブルに追加することで履歴として一覧化するプログラム。ここでは、手続き名が加入の場合のみに適用している。

適用先フォームブリッジ(管理画面)、アプリのURLは以下
1.フォームブリッジのURL: https://formbridge.kintoneapp.com/recipe/396685/show/
2.アプリのURL: https://nkr-group.cybozu.com/k/guest/389/3526/
開発のgoogleアカウント:robo-pat@nkr-group.com

注意・メモ:
1. コピペして活用する場合、インデントが揃わなくことある。インデントが整っていないとプログラムが動かなくなる
2. イベント関数を重複させて記述するとエラーになる
  */

//形式の異なる日付の各要素を取得して結合する関数。出力例:2022-12-26
(function() {
  "use strict";
  fb.events.kviewer.record.mapped = [function (state){
    state.record.加入401k.value.push({
      value: {
          // 各フィールドの初期値。参考URLより初期値を確認して適する値に設定する
        連絡日時加入: {value: ''},
        資格取得開始日: {value: ''},
        本人拠出の有無加入: {value: ''},
        本人拠出額加入: {value: ''},
        法人拠出額加入: {value: ''},
        指定日以降資格取得開始日:{value:''},
        備考加入:{value:''},
        手続き加入:{value:''}
      }
    });
  }];
  
 //以下は,フォームブリッジのフォームセルのデータを各変数に代入し,指定されたテーブルに格納する。
  fb.events.form.confirm = [function (state){
    let Now = moment().format('YYYY-MM-DD HH:mm');//moment関数を使用する際は,moment.jsを使用する
    //FBで実際に回答する項目のフィールドコードを指定し、変数に格納
    let add = [Now, state.record.資格取得日401k.value, state.record.本人拠出の有無.value, state.record.本人拠出額.value, state.record.法人拠出額.value, state.record.指定日以降資格取得開始日.value, state.record.備考加入.value];      
    let Status = state.record.ステータス5.value;
    //日付データを変換
    let License_get_date = new Date(state.record.資格取得日401k.value);
    //各テーブルにおけるテーブルの長さを取得
    let addcount = state.record.加入401k.value.length;

    //以下の処理の注意事項：ステータス401kはドロップダウン式なので代入するものはアプリのドロップダウン内の項目のどれかを入れる必要がある。それ以外の値などを代入するとエラーになる。
    if(Status == '新規加入'){//テーブルの0番目に最初は値を格納
      if(state.record.加入401k.value[0].value.連絡日時加入.value == ""){
        state.record.加入401k.value[0].value.連絡日時加入.value = add[0];
        state.record.加入401k.value[0].value.資格取得開始日.value = add[1];
        state.record.加入401k.value[0].value.本人拠出の有無加入.value = add[2];
        state.record.加入401k.value[0].value.本人拠出額加入.value = state.record.本人拠出現在.value = add[3];
        state.record.加入401k.value[0].value.法人拠出額加入.value = state.record.法人拠出現在.value = add[4];
        state.record.加入401k.value[0].value.指定日以降資格取得開始日.value = state.record.指定日以降資格取得開始日.value = add[5];
        state.record.加入401k.value[0].value.備考加入.value = state.record.備考加入.value = add[6];
      }else{
        state.record.加入401k.value[addcount-1].value.連絡日時加入.value = add[0];
        state.record.加入401k.value[addcount-1].value.資格取得開始日.value = add[1];
        state.record.加入401k.value[addcount-1].value.本人拠出の有無加入.value = add[2];
        state.record.加入401k.value[addcount-1].value.本人拠出額加入.value = state.record.本人拠出現在.value = add[3];
        state.record.加入401k.value[addcount-1].value.法人拠出額加入.value = state.record.法人拠出現在.value = add[4];
        state.record.加入401k.value[addcount-1].value.指定日以降資格取得開始日.value = state.record.指定日以降資格取得開始日.value = add[5];
        state.record.加入401k.value[addcount-1].value.備考加入.value = state.record.備考加入.value = add[6];
      }
    }
    
  }];

  fb.events.confirm.submit = [function (state){
    let addcount = state.record.加入401k.value.length;

    if(state.record.加入401k.value[addcount -1].value.連絡日時加入.value == ""){
      state.record.加入401k.value.pop({//末尾の要素削除
        value: {
          連絡日時加入: {value: ''},
          資格取得開始日: {value: ''},
          本人拠出の有無加入: {value: ''},
          法人拠出額加入: {value: ''},
          本人拠出額加入: {value: ''},
          指定日以降資格取得開始日: {value: ''},
          備考加入: {value: ''},
          手続き加入:{value:''}
        }
      });
    }
  }];
})();