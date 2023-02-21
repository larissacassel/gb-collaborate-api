module.exports = {
    requestFail: {
        code: 400,
        message: 'request failed',
    },

    userNameIsRequired: {
        code: 422,
        message: 'Username é obrigatorio',
    },

    passwordIsRequired: {
        code: 422,
        message: 'Senha é obrigatorio',
    },

    confirmPasswordIsRequired: {
        code: 422,
        message: 'Confirme a senha',
    },
    differentsPasswords: {
        code: 422,
        message: 'Senhas diferentes',
    },

    userExists: {
        code: 422,
        message: 'Por favor, utilize outro email',
    },
    useNotExists: {
        code: 404,
        message: 'Usuario nao encontrado',
    },
  }
