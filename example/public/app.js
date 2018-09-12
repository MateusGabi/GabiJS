var GabiJS = window.GabiJS

$(document).ready(function() {
    // ...
    $("#compiledMarkdown").emojidexReplace();
    $("textarea").emojidexAutocomplete();
    // ...
  });

  function PrintElem(elem)
{
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">')
    mywindow.document.write('')
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title  + '</h1>');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    // mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    // mywindow.close();

    return true;
}

var app = new GabiJS.App({
    name: 'Markdown',
    store: {
        content: '# hello'
    }
})

var TextComponent = new GabiJS.Component({
    app,
    el: 'textarea',
    onChangeState: function (_old, content) {
        this.setStore({ content })
    },
    on: {
        type: function (event) {
            this.setState({ content: event.target.value })
        },
    },
    template: function () {
        return this.state.content || '# Hello'
    }
})

var compiled = new GabiJS.Component({
    app,
    el: '#compiledMarkdown',
    on: {
        changeStore: function (store) {
            this.setState({ content: store.content })
        }
    },
    template: function () {
        // TODO pq temque colocar content.content??
        if (this.state.content)
            return marked(this.state.content.content || '')
        else return marked('# Hello')
    }
})

new GabiJS.Component({
    app,
    el: '#printBtn',
    on: {
        click: function () {
            const conteudo = compiled.nativeElement.innerHTML
            const tela_impressao = window.open('about:blank');

            tela_impressao.document.write(conteudo);

            tela_impressao.window.print();
            tela_impressao.window.close();
        }
    },
    template: function () {
        return 'Download PDF'
    }
})

new GabiJS.Component({
    app,
    el: '#saveBtn',
    on: {
        changeStore: function (store) {
            this.setState({ filename: store.filename })
        },
        click: function () {
            const {filename} = this.state
            if (filename) this.printFile()
            else alert('Insira um nome')
        }
    },
    methods: {
        printFile: function () {
            var elHtml = TextComponent.nativeElement.innerHTML;
            var link = document.createElement('a');
            mimeType = 'text/plain';

            link.setAttribute('download', `${this.state.filename}.md`);
            link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elHtml));
            link.click();
        },
    },
    template: function () {
        return 'Save Document'
    }
})

new GabiJS.Component({
    app,
    el: '#filenameInput',
    on: {
        type: function (event) {
            this.setStore({ filename: event.target.value })
        }
    }
})