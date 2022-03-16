const router = require('express').Router();

router.get('/', (req, res) => {
    const template = `
        <div>
            <h1>API-V361</h1>
            <a href="/">Acesse a documentação da API</a>
        </div>
    `
    res.status(200).send(template);
});

module.exports = router;