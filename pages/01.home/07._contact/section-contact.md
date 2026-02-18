---
title: Contact
surtitle: 'Une idée ? Un projet sur lequel vous avez besoin d''aide ?'
heading: 'Contactez-moi'

form:
    name: contact-form
    action: /
    inline_errors: true
    fields:
        firstname:
            type: text
            label: Prénom
            placeholder: Prénom
            autocomplete: given-name
            validate:
                required: true
        lastname:
            type: text
            label: Nom
            placeholder: Nom
            autocomplete: family-name
            validate:
                required: true
        company:
            type: text
            label: Entreprise
            placeholder: 'Nom de l''entreprise'
            autocomplete: organization
        email:
            type: email
            label: Email
            placeholder: 'Adresse email'
            autocomplete: email
            validate:
                required: true
        phone:
            type: tel
            label: Téléphone
            placeholder: 'Numéro de téléphone'
            autocomplete: tel
        request_type:
            type: select
            label: 'Type de demande'
            placeholder: 'Type de demande'
            validate:
                required: true
            options:
                module: 'Développement de module PrestaShop'
                theme: 'Création de thème PrestaShop'
                maintenance: 'Maintenance / TMA'
                migration: 'Migration PrestaShop'
                audit: 'Audit technique'
                recrutement: 'Recrutement'
                autre: 'Autre'
        message:
            type: textarea
            label: Message
            placeholder: 'Votre message'
            rows: 6
            validate:
                required: true
        consent:
            type: checkbox
            label: 'J''accepte que mes données soient traitées conformément à la <a href="/politique-de-confidentialite" target="_blank">politique de confidentialité</a>.'
            markdown: true
            validate:
                required: true
        honeypot:
            type: honeypot
    buttons:
        submit:
            type: submit
            value: Envoyer
            classes: 'btn-primary'
    process:
        email:
            subject: '[axelweb.fr] Nouveau message de {{ form.value.firstname }} {{ form.value.lastname }}'
            body: '{% include ''forms/data.html.twig'' %}'
        message: 'Merci ! Votre message a bien été envoyé.'
        reset: true
        display: /
---
