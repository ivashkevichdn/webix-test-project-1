var filmset = [
  { id:1, title:"The Shawshank Redemption", year:1994},
  { id:2, title:"The Godfather", year:1972},
  { id:3, title:"The Godfather: Part II", year:1974},
  { id:4, title:"The Good, the Bad and the Ugly", year:1966},
  { id:5, title:"My Fair Lady", year:1964},
  { id:6, title:"12 Angry Men", year:1957}
];


var jsonUI = {
  rows: [
    { view:"toolbar", id:"mybar", elements:[
      { view:"button", value:"Add", width:70, click:"add_row"},
      { view:"button", value:"Delete", width:70, click:"delete_row"},
      { view:"button", value:"Update", width:70, click:"update_row"},
      { view:"button", value:"Clear Form", width:85, click:"$$('myform').clear()"} ]
    },
    { cols:[
      {view:"form", id:"myform", width:200, elements:[
        { view:"text", name:"title", placeholder:"Title", width:180, align:"center"},
        { view:"text", name:"year", placeholder:"Year", width:180, align:"center"} ]
      },
      {
        view:"list",
        id:"mylist",
        template:"#id#: #title# - #year#",
        select:true, //enables selection
        height:400,
        data: filmset
        //url:"filmset.json"
      }
    ]}
  ]
};


function add_row(){
  $$("mylist").add({
    id: $$("mylist").getLastId() + 1,
    title: $$("myform").getValues().title,
    year: $$("myform").getValues().year,
  })
}


$$("mylist").attachEvent("onAfterSelect", function(id){
  $$("myform").setValues({
    title: $$("mylist").getItem(id).title,
    year: $$("mylist").getItem(id).year
  });
});


function update_row() {
  var sel = $$("mylist").getSelectedId();
  if(!sel) return;

  var value1 = $$("myform").getValues().title;
  var value2 = $$("myform").getValues().year;


  var item = $$("mylist").getItem(sel); //selected item object
  item.title = value1;
  item.year = value2;
  $$("mylist").updateItem(sel, item);
}


function delete_row() {
  var id = $$("mylist").getSelectedId();

  webix.confirm({
    title: "Delete",// the text of the box header
    text: "Are you sure you want to delete the selected item?",
    callback: function(result) {
      if (result) {
        $$("mylist").remove(id);
      }
    }
  });
}
