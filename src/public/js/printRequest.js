$('#printdiv').click(() => {
  $('#divImprimir').printThis({
    doctypeString: '<meta charset="utf-8">',
    importStyle: true,
    base: false,
  });
});
