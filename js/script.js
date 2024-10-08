$(document).ready(function() {
    // Armazenar os textos originais dos labels
    const labelOriginalText = {};

    $('form label').each(function() {
        const inputId = $(this).attr('for');
        if (inputId) {
            labelOriginalText[inputId] = $(this).text(); // Armazena o texto original
        }
    });
    
    // Permitir apenas letras e acentos no campo de nome, impedindo números
    $('#nome-form').on('input', function() {
        this.value = this.value.replace(/[0-9]/g, ''); // Bloqueia apenas números
    })  

    // Aplicar máscara ao telefone
    $('#telefone').mask('(00) 00000-0000', {
        placeholder:'(00) 00000-0000'   
    })

    $('form').validate({
        rules: {
            nome: {
                required:true
            },
            email: {
                required:true,
                email: true // Verifica se é um e-mail válido
            },
            telefone: {
                required:true,
                minlength: 14 // Garante que o telefone tenha ao menos 14 caracteres (formato com máscara)
            },
            mensagem: {
                required: true
            }
        },
        messages: {
            nome:'Por favor, insira o seu nome',
            email: 'Por favor, insira um e-mail válido',
            telefone: 'Por favor, insira o telefone no formato válido',
            mensagem: 'Por favor, insira uma mensagem'
        },
        
        errorPlacement: function(error, element) {
            // Localiza o label associado ao campo input
            const label = $('label[for="' + element.attr('id') + '"]')
    
            // Substitui o conteúdo do label pela mensagem de erro
            if (label.length) {
                label.html(error.text());
            }
        },
        success: function(label, element) {
            // Quando o campo é validado corretamente, restaura o texto original do label
            const inputId = $(element).attr('id');
            if (inputId && labelOriginalText[inputId]) {
                $('label[for="' + inputId + '"]').text(labelOriginalText[inputId]);
            }
        },

        submitHandler: function(form){
            alert('Formulário enviado com sucesso!')
            form.submit(); // Submete o formulário após a validação
        },
        invalidHandler: function(evento, validador) {
            let camposIncorretos = validador.numberOfInvalids();
            if(camposIncorretos) {
                alert(`Existem ${camposIncorretos} campos incorretos`);
            }
        }
    });
    // Evento para enviar o formulário
    $('#submit-button').on('click', function(e) {
        e.preventDefault(); // Evita o comportamento padrão do botão
        $('form').submit(); // Aciona a submissão, que será validada automaticamente
    })
});
