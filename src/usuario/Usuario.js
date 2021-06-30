import React, { Component } from 'react'
import DatePicker from 'react-date-picker'
import Select from 'react-select'
import './Usuario.css';
import './Usuario.css'

export default class Usuario extends Component {
    state = {
        id: "",
        nomeCompleto: "",
        sexo: "",
        sexobool: false,
        endereco: "",
        dataNascimento: new Date(),
        login: "",
        senha: "",
        nivelAcesso: "",
        telefoneDDD: "",
        telefoneNumero: "",
        parente: "",
        tiposUsuario: [],
        foto: "",
        fotoVazia: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAMgAyADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiqs+oWtsP3syA/3Qcn8qzpvEcQyIIWc+rHAoA2sigsAMk4Hqa5SbW72XO11jHog/rVKSaWY5kkdz/tNmgDr5dSs4eHuYwfQHP8AKqcuv2a/dEj/AEXH865iigDdk8R/887b/vp/8KgfxDdn7qRL+BNZNFAGg2tX7f8ALYD6KKiOqXx63Un4HFVKKALBv7s9bqX/AL6NN+2XX/PxN/32ahooAm+2XX/PxN/32acL67HS6l/76qvRQBbGp3w6XUn4nNSrrV+v/LYH6qKz6KANZPEN2v3kib8CKnj8Rn/lpbf98vWFRQB08fiC0b76yJ9Vz/KrcWp2UxwlymfQnH8642igDvAysMggj1FGRXDRyyRHMcjof9lsVei1u9ixmQSD0cUAdZRWHD4jQ4E8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zuPk9h61tgYoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiop7iO2iaSVgqDuaAHvIkaF3YKqjJJ7VzOqau10TDASsHc9C3/1qg1HU5L59oykIPCevuao0AFFFFABRRRQAVZsrKW+l2RD5R95z0FS6fpsl8+eVhB+Z/wCgrqre3itoViiUKo9KAI7Oyisotka/7zHqTVmiigCC7tUu7ZoZBweh9D61xs0L28zxSDDKcGu561j67YedD9ojGZIx83utAHNUUUUAWLO7ayukmXkDhh6j0rsopFljWRDlWGQa4Wt3Qb7ANm5/2o8/qKAOgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAqK5nS2geVzwgzUprnvEN3udLVTwPmfHr2FAGNNM08zyufmc5NMoooAKuabZm9u1Q/6tfmf6elUxXW6TZC0slDDEj/M/+FAF9VCgADAHApaKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoopkkqRDdI6ovqxxQA+iqTavp69b2DPs4pv9t6Z/z+w/99UAX6Kof23pn/P7F+dH9t6Z/wA/sX50AX6Kof23pn/P7F+dH9t6Z/z+xfnQBfoqh/bemf8AP7F+dH9t6Z/z+xfnQBfoqh/bemf8/sX50f23pn/P7F+dAF+iqH9t6Z/z+w/99Uq6xpzHAvYM+74oAvUVHFNHMMxyK6+qsDUlABRRRQAUUUUAFFFFABRRVLUNSisI8t80hHyoOp/+tQBJeXkNnAZJW+ijqx9q5W+vpr6be5wo+6g6Corm5lu5jLM25j09APaoqACiiigAooooAK1NM0hrsiWYFYO3Yt/9ap9L0XzNs92uF6rGe/ua6EKAMDpQAiRrGgRFCqBgAU6iigAooooAKQjPbilooA5DVbL7HdkKP3T/ADJ7e1Ua7DU7IXlkyAZkX5k+tcgQQcEYI7UAJTo5GilWRDhlORTaKAO2tblbq3jlX+Icj0PcVPXN6Bd+XM1sx+V+V+tdIKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAiuJlgt3lb7qDJrippWnmeV/vOcmt3xDc7US2U8t8zfTtXP0AFFFFAGlotn9qvQ7D5IvmPuewrqhxVLSrT7HZIhH7xvmf61eoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDM1vVBpdlvUBpnOI1Pr6/hXCXN1PeSmS4laRj/ePT6CtfxXMX1VYs8Rxjj3PNYVABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAD4J5baQSQyvG47qcV2+g6wdTt2SbAuIwN2P4h61wtavhyYw63CM8SAofy/xFAHf0UUUAFFFFABRQaxdU1kQ7obYgydGcdF+nvQBPqWqpZAxx4ecjgdl9zXMSyvNIZJGLOepNNLFiSxJJOST3pKACiiigAoop8UbzSCONSzseAKAGgFmCgEsTgAd66LTNG8rbPcgGTqqdl+vvU+maSlmBJJhpz1PZfYVpgYoAKKKKACiiigAooooAKKKKAAjIrl9cs/s935yj5Jefoe9dRVTUbX7XZyRgfNjKn3FAHG0UEEEgjBHBooAdHI0UiyIcMpyK7W1uFubZJl6OM/SuIre8PXX+stWP+2n9aAN+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigApCQMk8AUtZ+s3H2fT5CDhn+QfjQBzV9cG6vZZexbA+naq9GKKACr+j2v2q/XP3I/nb+lUK6nQ7XybASMPnlO4/TtQBqUUUUAFFFFABRRRQAUUUUAFFFFABRRWN4h1U6daBIj/pEvCn+6O5oAm1HXLLTjskcvN/zzTk/j6ViSeMZN37qzUL/tvz+lc0SWJLEkk5JPc0lAHRf8Jhd/8APrB/30aP+Ewu/wDn1g/76Nc7RQB0X/CYXf8Az6wf99Gj/hMLv/n1g/76Nc7RQB0X/CYXf/PrB/30aP8AhMLv/n1g/wC+jXO0UAdF/wAJhd/8+sH/AH0aP+Ewu/8An1g/76Nc7RQB0X/CYXf/AD6wf99Gj/hMLv8A59YP++jXO0UAWb+9fULx7mRFVnwCF6cDFVqKKACiiigAooooAKKKKACiiigAooooAKKKKACprW4a0u4rhFDNG24A9DUNFAHRf8Jhd/8APrB/30aP+Ewu/wDn1g/76Nc7RQB0X/CYXf8Az6wf99Gj/hMLv/n0h/M1zwBYgAEk+lXre2EfzP8Af9PSgDYk129ubcoyJCW/uE5x/Ss+iigAooooAKKKjlmWJcnr2HrQA6SRY03McCtvQtQ03AjDGO5bqZe/sDXJSytK+5vwFMoA9UzRXOeGNWe5Q2c7bpIxlGPUr6fhXR0AFFFFABRRRQAUUUUAFFFFABRRRQByetWv2e/LqPkl+YfXvWdXWaza/aNPYqPnj+cf1rk6ACprSc2t3FMP4W5+neoaKAO8VgwBByCMilrM0O48/T1UnLRHafp2rToAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK5rxDcb7pIFPEa5P1P8A9aukYgKSegriLqY3F1LMf42JH07UARUUUUATWsBubqOEfxNg/TvXaooRAq8KOBXP+HbfdNJcMOFG1fqetdF0oAKKKKACiiigAooooAKKKKACiiigBD0rhfFExk1t17Roqj+ZruzXn/iH/kO3P1H8hQBl0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABTlRnbaoyaWKJpXwo+p9K0YoVhXavPqaAGQQLCM9WPU1NRRQAUUUUAFFFammaQ10RNOCsPYdC3/wBagDFnuFiGAQzntVB3aRizHJNehXWjafdR7XtkBxgMg2kfjXIaxok2lsHBMluxwHxyD6GgDKooooAvaLMYNZtGB6yBT9DxXoo4Fea6d/yErX/rqv8AOvS6ACiiigAooooAKKKKACiiigAooooARhlSD071xd7bG1vJYscKePp2rta5/wARW+GiuAOvyN/SgDCooooA1tAuPKvjEekq4H1H+TXT1w0EpgnjlXqjA126MGQMOhGRQA6iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAKWqz+RpszA/MRtH48Vx/06V0HiOXbHDCD94lj+Fc/QAUUVLbQ/aLqKH+8wH4UAdTpEH2fT4gR8zDe341fpAoUADoOlLQAUUUUAFFFFABRRRQAUUUUAFFFFAAa8/wDEP/IdufqP5CvQDXn/AIh/5Dtz9R/IUAZdFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFA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4wt1B8m2lc/7RCigDo8gVWvNRtbCPfcShOOF6k/QVx934nv7gFYikC/7AyfzNY7u8jl5HZmPJLHJoA2NV8RT34aGAGGA9cH5m+tYtFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBZ07/kJ2v8A11X+del15pp3/ITtf+uq/wA69LoAKKKKACiiigAooooAKKKKACiiigAooooA57xHLmSCHPQFj/KsOrurz+fqcpHIU7B+H+TVKgAq3pkXnalAuOA24/hzVStjw7FuupZSPuLgfj/+qgDpaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAy9dhMmnM4HMZDf0NctXdTRiWF426MpFcMyGN2Q9VJBoASjpyOo6UUUAdrZTi4tIZR/EuT9e9WKxPDtxugkgJ5Q7l+hrboAKKKKACiiigAooooAKKKKACiiigANef+If+Q7c/UfyFegGvP/EP/IdufqP5CgDLooooAKKKmggM3PRPWgBsULTPgcAdTWhFGsSbVH1NOVFRQqjAFLQAUUUUAFFFFABVae6CZROW7n0plxdZykZ47tVSgBSckkkkmkoooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKALOnf8hO1/66r/ADr0uvNNO/5Cdr/11X+del0AFFFFABRRRQAUUUUAFFFFABRRRQAVDczCC3klP8Ck1NWP4hn8u0SEHmRufoKAObJLEsTyTk0lFFABXT6BDssPMI5kYn8BxXMgEkAdScCu3tohBbRRDoigUAS0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAGuT1uDyNSdsfLIN4/rXWVj+ILfzLRZwPmjPP0P+RQBzVFFFAF7SbkW2oRsThX+RvxrrxXBV2enXP2qxjkz82MN9RQBaooooAKKKKACiiigAooooAKKKKAA15/4h/5Dtz9R/IV6Aa8/wDEP/IdufqP5CgDLooq3b2vR5B9FoAZBamTDPwn86vAAAADAFLRQAUUUUAFFFIzqilmOAKAAkAEkgAdzVG4uTJ8q5Cfzps87TH0XsKhoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAC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bfKvL49fSsWlZmdizHLMck+ppKACiitDSLP7Vdh2H7uLDH3PYUAbmkWf2S0XcP3knzN7egrRoooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooArXtot5aPC2Mn7p9D2rjXjaKRo3GGU4Iru6wdesNw+1xjkDEg9vWgDAooooAt6detZXQk6oeHHtXYIyugZTlSMg1wlbeiamIs2s7gJ1RientQB0JOKwdU1r70Fo3s0g/kKr6nrBuSYbclYehboW/+tWTQAUUUUAFFFFABUkFvLczCKJdzGpLSzlvZvLiGAPvMeiiursrGGyhCRjLH7znq1AEWnaZHYru4aYj5n/oKv0UUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAjMFUknAHU1yGp3xvbosD+6ThB7etaOuajwbOJuf+WhH8qwaACiiigBVRndUQbmY4A9a7HT7NbK0WIYLdWPqaytBscsbuQcdIx/M10FABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAU1lDghgCpGCDTqKAOO1KxNjclR/qm5Q+3pVOuzv7JL22aJuD1Vv7prj5YnglaKRdrqcEUAMooooAKKKKACiiigAq7p+my378fLED8z/ANB71NpukteESS5WD17t9K6eKNIo1SNQqrwAKAGW1tFaRCKJdqj8yfWpqKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAM4rN1bURZw7IyDO4+Ueg9asX97HZW5d+WP3V9TXITzSXEzSytl260ARkkkkkknkk0UUUAFWtPs2vroRjhBy59qrxxtLIsaLuZjgCuv06xSythH1c8u3qaALSIsaKqjCqMADtTqKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoo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f2lpzwrgSA7oyfWsvR9eS3jFjqRMMsPyhmHBHofSulIyMVWu9Ns74f6TAkhHRiOR+NAFa517TbeIt9qSQjosZ3E1j6VBPrGrnVbhNkKf6sHuR0x9P51sReHtLhYMLUMR03sWH61pBQoAAwB0AoAWuW8Wf8fen/7x/mK6mq9zYWt4yNcQLIUOVLdqALFYfiTTJL23jntxmeA5AHUj29+K3KMUAYWm+I7WeJVu5BBOowwbgE+ualv/ABFYWsJaOZZ5f4UQ5yfc1au9HsL1i89spc9WHB/SmW2habauHjtV3A5BYliPzoAzfDljM082p3a4lmzsB64PU10dJiloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Z",
        parentesOpcoes: [],
        parentes: [],
        telefones: [],
        usuarios: [],
        opcaoAcesso: "",
        incluindo: false,
        alterando: false,
        analisando: false,
        gerenciando: false,
        options: [
            { value: 'Membro', label: 'Membro' },
            { value: 'Administrador', label: 'Administrador' }
        ]
    }
    

    /* ------------------------------------------------- SET STATE --------------------------------------------- */
    txtNomeCompleto_change = (event) => {
        this.setState({nomeCompleto: event.target.value})
    }

    txtSexo_change = (event) => {
        this.setState({sexo: event.target.value})
    }

    txtEndereco_change = (event) => {
        this.setState({endereco: event.target.value})
    }
    dataNascimento_change = (date) => {
        this.setState({dataNascimento: date})
    }

    txtLogin_change = (event) => {
        this.setState({login: event.target.value})
    }

    txtSenha_change = (event) => {
        this.setState({senha: event.target.value})
    }

    foto_change = (event) => {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            this.setState({foto: reader.result})
        }
    }

    nivelAcesso_change = (temp) => {
        this.setState({nivelAcesso: temp})
    }

    parente_change = (temp) => {
        this.setState({parente: temp})
    }

    txtTelefoneDDD_change = (event) => {
        this.setState({telefoneDDD: event.target.value})
    }

    txtTelefoneNumero_change = (event) => {
        this.setState({telefoneNumero: event.target.value})
    }

    /* ------------------------------------------------- FUNCIONALIDADES --------------------------------------------- */

    /* ----- CADASTRAR USUÁRIO ----- */
    cadastrarNovo = () => {
        this.setState({ incluindo: true, nomeCompleto: '', sexo: '', endereco: '', login: '', senha: '', dataNascimento: new Date(), nivelAcesso: "", telefones: [], parentes: [], foto: this.state.fotoVazia})
    }

    /* ----- ALTERAR USUÁRIO ----- */
    alterarNovo = (usuario) => {
        this.setState({ alterando: true, id: usuario.id, nomeCompleto: usuario.nomeCompleto, sexo: usuario.sexo, endereco: usuario.endereco, login: usuario.login, senha: usuario.senha, dataNascimento: usuario.dataNascimento, nivelAcesso: usuario.nivelAcesso, telefones: usuario.telefones, parentes: usuario.parentes, foto: usuario.foto })
        this.preencherTelefones(usuario.id)
        this.preencherParentes(usuario.id)
        this.verificarNivelAcesso(usuario.nivelAcesso)
        this.verificarSexo(usuario.sexo)
    }

    /* ----- VER DETALHES ----- */
    verDetalhes = (usuario) => {
        this.setState({ analisando: true, id: usuario.id, nomeCompleto: usuario.nomeCompleto, sexo: usuario.sexo, endereco: usuario.endereco, login: usuario.login, senha: usuario.senha, dataNascimento: usuario.dataNascimento, nivelAcesso: usuario.nivelAcesso, telefones: usuario.telefones, parentes: usuario.parentes, foto: usuario.foto })
        this.preencherTelefones(usuario.id)
        this.preencherParentes(usuario.id)
    }

    /* ----- GERENCIAR USUÁRIO ----- */
    gerenciarUsuario = (usuario) => {
        this.setState({ gerenciando: true, id: usuario.id, nomeCompleto: usuario.nomeCompleto, sexo: usuario.sexo, endereco: usuario.endereco, login: usuario.login, senha: usuario.senha, dataNascimento: usuario.dataNascimento, nivelAcesso: usuario.nivelAcesso, telefones: usuario.telefones, parentes: usuario.parentes, parente: "", telefoneDDD: "", telefoneNumero: "", foto: usuario.foto})
        this.preencherTelefones(usuario.id)
        this.preencherParentes(usuario.id)
        this.preencherParentesOpcoes(usuario.id);
    }

    /* ----- PREENCHER COMBOBOX NIVEL ACESSO ----- */
    preencherComboboxNivelAcesso = () => {
        const url = window.servidor + '/usuario/listarNivelAcesso'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ tiposUsuario: data }))
    }

    /* ----- PREENCHER TELEFONES ----- */
    preencherTelefones = (usuarioID) => {
        const url = window.servidor + '/usuario/gerenciar/' + usuarioID + '/telefone/listar'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ telefones: data }))
    }

    /* ----- PREENCHER PARENTES ----- */
    preencherParentes = (usuarioID) => {
        const url = window.servidor + '/usuario/gerenciar/' + usuarioID + '/parente/listar'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ parentes: data }))
    }

    /* ----- PREENCHER PARENTES OPÇOES ----- */
    preencherParentesOpcoes = (usuarioID) => {
        const url = window.servidor + '/usuario/gerenciar/' + usuarioID + '/parente/listarOpcoes'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ parentesOpcoes: data }))
    }

    /* ----- GRAVAR NOVO USUÁRIO ----- */
    verificarNivelAcesso = (nivelAcesso) => {
        if(nivelAcesso === "Membro"){
                this.setState({opcaoAcesso: "0"})
        }
        else if(nivelAcesso === "Administrador"){
                this.setState({opcaoAcesso: "1"})
        }
        else{
                this.setState({opcaoAcesso: "-1"})
        }
        //console.log(nivelAcesso)
        //console.log(this.state.opcaoAcesso)
    }

    verificarSexo = (sexo) => {
        if(sexo === "Masculino"){
                this.setState({sexobool: false})
        }
        else if(sexo === "Feminino"){
                this.setState({sexobool: true})
        }
        else{
                this.setState({sexobool: null})
        }
    }

    gravarNovo = () => {
        const dados = {
            "nomeCompleto": this.state.nomeCompleto,
            "sexo": this.state.sexo,
            "dataNascimento": this.state.dataNascimento,
            "endereco": this.state.endereco,
            "login": this.state.login,
            "senha": this.state.senha,
            "nivelAcesso": this.state.nivelAcesso.value,
            "foto": this.state.foto
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        const url = window.servidor + '/usuario/gravar'
        console.log(this.state.nivelAcesso)

        fetch(url, requestOptions)
            .then(fim => {
                console.log('Gravado')
                console.log(this.state.nivelAcesso)
                this.setState({ incluindo: false })
                this.preencherListaUsuario()
            })
            .catch(erro => console.log(erro));
    }


    /* ----- GRAVAR ALTERAÇÕES ----- */
    gravarAlterar = () => {
        const dados = {
            "nomeCompleto": this.state.nomeCompleto,
            "sexo": this.state.sexo,
            "dataNascimento": this.state.dataNascimento,
            "endereco": this.state.endereco,
            "login": this.state.login,
            "senha": this.state.senha,
            "nivelAcesso": this.state.nivelAcesso.value,
            "foto": this.state.foto
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        const url = window.servidor + '/usuario/alterar/' + this.state.id

        fetch(url, requestOptions)
            .then(fim => {
                console.log('Gravado')
                this.setState({ alterando: false })
                this.preencherListaUsuario()
            })
            .catch(erro => console.log(erro));
    }

    /* ----- EXCLUIR USUÁRIO ----- */
    excluirUsuario = (usuario) => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const url = window.servidor + '/usuario/excluir/' + usuario.id

        fetch(url, requestOptions)
            .then(fim => {
                this.preencherListaUsuario()
            })
            .catch(erro => console.log(erro));
    }
    
    /* ----- ADICIONAR PARENTE ----- */
    adicionarParente = (usuarioID, id_parente) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        
        const url = window.servidor + '/usuario/gerenciar/' + usuarioID + '/parente/adicionar/' + id_parente

        fetch(url, requestOptions)
            .then(fim => {
                this.preencherParentes(usuarioID)
            })
            .catch(erro => console.log(erro));

        this.setState({parente: ""})
    }

    /* ----- REMOVER PARENTE ----- */
    removerParente = (usuarioID, id_parente) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        
        const url = window.servidor + '/usuario/gerenciar/' + usuarioID + '/parente/remover/' + id_parente

        fetch(url, requestOptions)
            .then(fim => {
                this.preencherParentes(usuarioID)
            })
            .catch(erro => console.log(erro));
    }

    /* ----- ADICIONAR TELEFONE ----- */
    adicionarTelefone = (usuarioID) => {
        const dados = {
            "ddd": this.state.telefoneDDD,
            "numero": this.state.telefoneNumero
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        const url = window.servidor + '/usuario/gerenciar/' + usuarioID + "/telefone/adicionar"

        fetch(url, requestOptions)
            .then(fim => {
                this.preencherTelefones(usuarioID)
            })
            .catch(erro => console.log(erro));
            
            this.setState({telefoneDDD: "", telefoneNumero: ""})
    }

    /* ----- REMOVER TELEFONE ----- */
    removerTelefone = (usuarioID, telefoneID) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const url = window.servidor + '/usuario/gerenciar/' + usuarioID + "/telefone/remover/" + telefoneID

        fetch(url, requestOptions)
            .then(fim => {
                this.preencherTelefones(usuarioID)
            })
            .catch(erro => console.log(erro));
    }

    /* ----- PREENCHER LISTA USUÁRIO ----- */
    preencherListaUsuario = () => {
        const url = window.servidor + '/usuario/consultar'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ usuarios: data }));
    }

    componentDidMount() {
        this.preencherListaUsuario()
    }

    /* ----- BOTÃO VOLTAR ----- */
    voltar = () => {
        this.setState({ incluindo: false, alterando: false, analisando: false, gerenciando: false})
    }

    /* ----------------------------------------------- TELA CADASTRAR USUÁRIO --------------------------------------------- */
    renderCadastrarUsuario = () => {
        return (
            <div className="container">
            <div className="row mt-5 pt-4 g-3">
                <div className="col-12">
                    <h5>Cadastro de Usuário</h5>
                    <hr></hr>
                </div>

                <div className="col-12">
                    <label for="nome" className="form-label">Nome Completo</label>
                    <input value={this.state.nomeCompleto} onChange={this.txtNomeCompleto_change} className="form-control" type="text" id="nome"></input>
                </div>

                <div className="col-md-4">
                    <label>Foto de Perfil</label>
                    <div className="row mt-2">
                        <figure className="figure">
                            <img src={this.state.foto} alt="Foto de Perfil" className="img-thumbnail rounded "/>
                        </figure>
                    </div>
                    <input className="form-control-sm" id="formFileSm" type="file" onChange={this.foto_change}/>
                </div>

                <div className="col-md-4">
                    <label for="sexo" className="form-label">Sexo</label>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="sexo" id="sexoMasc" value="Masculino" onChange={this.txtSexo_change} checked></input>
                                <label className="form-check-label" for="sexoMasc">Masculino</label>
                            </div>
                        </div> 
                        <div className="col-md-4">
                            <div class="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="sexo" id="sexoFem" value="Feminino"  onChange={this.txtSexo_change}></input>
                                <label className="form-check-label" for="sexoFem">Feminino</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 box-center">
                    <label for="dataNascimento" className="form-label">Data de Nascimento</label> 
                    <div className="" id="dataNascimento">
                        <DatePicker value={this.state.dataNascimento} onChange={this.dataNascimento_change}></DatePicker>
                    </div>
                </div>

                <div className="col-12">
                    <label for="endereco" className="form-label">Endereço</label>
                    <input value={this.state.endereco} onChange={this.txtEndereco_change} className="form-control" type="text" id="endereco"></input> 
                </div>
                
                <div className="col-md-4">
                    <label for="login" className="form-label">Login</label>
                    <input value={this.state.login} onChange={this.txtLogin_change} className="form-control name-pull-image" type="text" id="login"></input>
                </div>

                <div className="col-md-4">
                    <label for="senha" className="form-label">Senha</label>
                    <input value={this.state.senha} onChange={this.txtSenha_change} className="form-control name-pull-image" type="password" placeholder="Senha" id="senha"></input>
                </div>

                <div className="col-md-4">
                    <label for="nivelAcesso" className="form-label">Nivel Acesso</label>
                    <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="Nível de Acesso"
                            onChange={this.nivelAcesso_change}
                            isSearchable={false}            
                            options={this.state.options}
                            value={this.state.nivelAcesso}>
                    </Select>
                </div>

                <div className="col-2 mt-3 mb-3">
                    <button className="btn btn-primary" onClick={() => this.gravarNovo()}>Gravar</button>
                </div>

                <div className="col-2 mt-3 mb-3">
                    <button className="btn btn-primary" onClick={() => this.voltar()}>Voltar</button>
                </div>
                
            </div>
            </div>
        
        )
    }

    /* ----------------------------------------------- TELA ALTERAR USUÁRIO ----------------------------------------------- */
    renderAlterarUsuario = () => {
        return (
            <div className="container">
            <div className="row mt-5 pt-3 g-4">
                <div className="col-12">
                    <h5>Alteração de Usuário</h5>
                    <hr></hr>
                </div>

                <div className="col-md-6">
                    <label for="id" className="form-label">ID</label>
                    <input value={this.state.id} readOnly={true} className="form-control" type="text" id="id"></input>
                </div>

                <div className="col-md-6">
                    <label for="nome" className="form-label">Nome Completo</label>
                    <input value={this.state.nomeCompleto} onChange={this.txtNomeCompleto_change} className="form-control" type="text" id="nome"></input>
                </div>

                <div className="col-md-4">
                    <label>Foto de Perfil</label>
                    <div className="row mt-2">
                        <figure className="figure">
                            {this.state.foto === "" ? <img src={this.state.fotoVazia} alt="Foto de Perfil" className="img-thumbnail rounded "/> : <img src={this.state.foto} alt="Foto de Perfil" className="img-thumbnail rounded "/> }
                        </figure>
                    </div>
                    <input className="form-control-sm" id="formFileSm" type="file" onChange={this.foto_change}/>
                </div>

                <div className="col-md-4">
                    <label for="sexo" className="form-label">Sexo</label>
                    <input value={this.state.sexo} readOnly={true} className="form-control" type="text" id="sexo"></input>
                </div>

                <div className="col-md-4 box-center">
                    <label for="dataNascimento" className="form-label">Data de Nascimento</label>
                    <div className="mt-1" id="dataNascimento">
                        <DatePicker value={this.state.dataNascimento} onChange={this.dataNascimento_change}></DatePicker>
                    </div>
                </div>

                <div className="col-12">
                    <label for="endereco" className="form-label">Endereço</label>
                    <input value={this.state.endereco} onChange={this.txtEndereco_change} className="form-control" type="text"></input>
                </div>

                <div className="col-md-4">
                    <label for="login" className="form-label">Login</label>
                    <input value={this.state.login} onChange={this.txtLogin_change} className="form-control" type="text" id="login"></input>
                </div>

                <div className="col-md-4">
                    <label for="senha" className="form-label">Senha</label>
                    <input value={this.state.senha} onChange={this.txtSenha_change} className="form-control" type="password" id="senha" placeholder="Senha"></input>
                </div>

                <div className="col-md-4">
                    <label for="nivelAcesso" className="form-label">Nivel Acesso</label>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Nível de Acesso"
                        onChange={this.nivelAcesso_change}
                        isSearchable={false}            
                        options={this.state.options}
                        value={this.state.nivelAcesso}
                        defaultValue={this.state.nivelAcesso}>
                    </Select>
                </div>

                <div className="row mt-4">
                    <div className="col-2">
                        <button className="btn btn-primary" onClick={() => this.gravarAlterar()}>Gravar</button>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-primary" onClick={() => this.voltar()}>Voltar</button>
                    </div>
                </div>
            </div>
            </div>
        )
    }

    /* ----------------------------------------------- TELA DETALHES DO USUÁRIO ------------------------------------------- */
    renderVerDetalhes = () => {
        return (
            <div className="container">
            <div className="row mt-5 pt-3 g-4">
                <div className="col-12">
                    <h5>Detalhes do Usuário</h5>
                    <hr></hr>
                </div>

                <div className="col-md-6">
                    <label for="id" className="form-label">ID</label>
                    <input value={this.state.id} readOnly={true} className="form-control" type="text" id="id"></input>
                </div>

                <div className="col-md-6">
                    <label for="nome" className="form-label">Nome Completo</label>
                    <input value={this.state.nomeCompleto} readOnly={true} className="form-control" type="text" id="nome"></input>
                </div>

                <div className="col-md-4">
                    <label>Foto de Perfil</label>
                    <div className="row mt-2">
                        <figure className="figure">
                            {this.state.foto === "" ? <img src={this.state.fotoVazia} alt="Foto de Perfil" className="img-thumbnail rounded "/> : <img src={this.state.foto} alt="Foto de Perfil" className="img-thumbnail rounded "/>}
                        </figure>
                    </div>
                </div>

                <div className="col-md-4">
                    <label for="sexo" className="form-label">Sexo</label>
                    <input value={this.state.sexo} readOnly={true} className="form-control" type="text" id="sexo"></input>
                </div>

                <div className="col-md-4 box-center">
                    <label for="dataNascimento" className="form-label">Data de Nascimento</label>
                    <div className="mt-1" id="dataNascimento">
                        <DatePicker value={this.state.dataNascimento} disabled={true}></DatePicker>
                    </div>
                </div>

                <div className="col-12">
                    <label for="endereco" className="form-label">Endereço</label>
                    <input value={this.state.endereco} readOnly={true} className="form-control" type="text" id="endereco"></input>
                </div>

                <div className="col-md-4">
                    <label for="login" className="form-label">Login</label>
                    <input value={this.state.login} readOnly={true} className="form-control" type="text" id="login"></input>
                </div>

                <div className="col-md-4">
                    <label for="senha" className="form-label">Senha</label>
                    <input value={this.state.senha} readOnly={true} className="form-control" type="password" id="senha"></input>
                </div>

                <div className="col-md-4">
                    <label for="nivelAcesso" className="form-label">Nivel Acesso</label>
                    <input value={this.state.nivelAcesso} readOnly={true} className="form-control" type="text" id="nivelAcesso"></input>
                </div>

                <div className="col-md-6">
                    <label className="form-label table-name">Telefones</label>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">DDD</th>
                                <th scope="col">Número</th>                                                    
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.telefones.length === 0 ? <p className="mt-1">Nenhum telefone adicionado</p> : this.state.telefones && this.state.telefones.map(telefone => {
                                return <tr key={telefone.id}>
                                    <th scope="row">{telefone.ddd}</th>
                                    <td>{telefone.numero}</td>                                
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                
                <div className="col-md-6">
                    <label className="form-label table-name">Parentes</label>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome Completo</th>                                                   
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.parentes.length === 0 ? <p className="mt-1">Nenhum parente adicionado</p> : this.state.parentes && this.state.parentes.map(parente => {
                                return <tr key={parente.id}>
                                    <td>{parente.id}</td>
                                    <td>{parente.nomeCompleto}</td>                                
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                
                <div className="row">
                    <div className="col-2 mb-3">
                        <button className="btn btn-primary" onClick={() => this.voltar()}>Voltar</button>
                    </div>
                </div>
            </div>
            </div>
        )
    }

    /* ------------------------------------------------- TELA GERENCIAR USUÁRIO --------------------------------------------- */
    renderGerenciarUsuario = () => {
        const {parente} = this.state;
        return (
            <div className="container">
            <div className="row mt-5 pt-4 g-4">
                <div className="col-12">
                    <h4>Gerenciamento de Usuário</h4>
                    <hr></hr>
                </div>

                <div className="col-12">
                    <h5>Parentes</h5>
                    <div className="row">
                        <div className="col-md-3">
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder="Parente"
                                onChange={this.parente_change}
                                isSearchable={this.isSearchable}
                                options={this.state.parentesOpcoes.map(u => ({ value: u.id, label: u.nomeCompleto }))}
                                value={parente}>
                            </Select>
                        </div>

                        <div className="col-md-3">
                            <button type="button" className="btn btn-outline-primary" onClick={() => this.adicionarParente(this.state.id, parente.value)}>Adicionar</button>
                        </div>
                    </div>

                    <table className="table mt-2">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                                <th scope="" className="col-1"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.parentes.length === 0 ? <p className="mt-1">Nenhum parente adicionado</p> : this.state.parentes && this.state.parentes.map(parente => {
                                return <tr key={parente.id}>
                                    <th scope="row">{parente.id}</th>
                                    <td>{parente.nomeCompleto}</td>
                                    <td><button type="button" onClick={() => this.removerParente(this.state.id, parente.id)} className="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Remover membro"><i className="bi bi-person-x"></i></button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                
                <div className="col-12">
                    <h5>Telefones</h5>
                    <div className="row">
                        <div class="col-md-2">
                            <input placeholder="DDD" value={this.state.telefoneDDD} onChange={this.txtTelefoneDDD_change} className="form-control" type="text"></input>
                        </div>
        
                        <div class="col-md-3">
                            <input placeholder="Número" value={this.state.telefoneNumero} onChange={this.txtTelefoneNumero_change} className="form-control" type="text"></input>
                        </div>

                        <div class="col-md-3">
                            <button type="button" className="btn btn-outline-primary" onClick={() => this.adicionarTelefone(this.state.id)}>Adicionar</button>
                        </div>
                    </div>

                    <table className="table mt-2">
                        <thead>
                            <tr>
                                <th scope="col">DDD</th>
                                <th scope="col">Numero</th>
                                <th scope="" className="col-1"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.telefones.length === 0 ? <p className="mt-1">Nenhum telefone adicionado</p> : this.state.telefones && this.state.telefones.map(tel => {
                                return <tr key={tel.id}>
                                    <th scope="row">{tel.ddd}</th>
                                    <td>{tel.numero}</td>
                                    <td><button type="button" onClick={() => this.removerTelefone(this.state.id, tel.id)} className="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Remover membro"><i className="bi bi-telephone-x"></i></button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="row">
                    <div className="col-2">
                        <button className="btn btn-primary" onClick={() => this.voltar()}>Voltar</button>
                    </div>
                </div>
            </div>
            </div>
        )
    }

    /* ------------------------------------------------- TELA LISTA DE USUÁRIOS --------------------------------------------- */
    renderExibirListaUsuarios = () => {
        return (
            <div className="container">
            <div className="mt-5 pt-5">
                <div className="col-12">
                    <h4>Usuários</h4>
                    <hr></hr>
                </div>
                <div className="col-2 mt-3 mb-3">
                    <button type="button" className="btn btn-outline-primary mt-2" onClick={() => this.cadastrarNovo()}>Cadastrar</button>
                </div>
                
                <table className="table mt-2">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome Completo</th>
                            <th scope="col">Data de Nascimento</th>  
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>  
                            <th scope="col"></th>  
                                                    
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.usuarios && this.state.usuarios.map(usuario => {
                            return <tr key={usuario.id}>
                                <th scope="row">{usuario.id}</th>
                                <td>{usuario.nomeCompleto}</td>
                                <td>{usuario.dataNascimento}</td>
                                <td><button type="button" onClick={() => this.verDetalhes(usuario)} className="btn btn-success" data-toggle="tooltip" data-placement="top" title="Ver Mais"><i className="bi bi-three-dots"></i></button></td>
                                <td><button type="button" onClick={() => this.alterarNovo(usuario)} className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Editar Usuário"><i className="bi bi-pencil-square"></i></button></td>
                                <td><button type="button" onClick={() => this.gerenciarUsuario(usuario)} className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Gerenciar Telefones e Parentes"><i className="bi bi-journal-text"></i></button></td>    
                                <td><button type="button" onClick={() => this.excluirUsuario(usuario)} className="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Excluir Usuário"><i className="bi bi-trash"></i></button></td>                                                                
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            </div>
        )
    }

    render() {
        let pagina = ''
        if (this.state.incluindo) {
            pagina = this.renderCadastrarUsuario()
        } else {
            if (this.state.alterando) {
                pagina = this.renderAlterarUsuario()
            } else {
                if (this.state.analisando) {
                    pagina = this.renderVerDetalhes()
                }
                else {
                    if(this.state.gerenciando){
                        pagina = this.renderGerenciarUsuario()
                    }
                    else{
                        pagina = this.renderExibirListaUsuarios()
                    }                 
                }
                
                }
        }
        return pagina  
    }
}
