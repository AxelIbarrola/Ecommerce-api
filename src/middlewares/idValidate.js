const idValidate = (req, res, next) => {
    const { id } = req.params;

    if (!id || isNaN(id) || Number(id) <= 0) {
        return res.status(400).json({ error: 'Formato de ID inválido.'})
    }

    next()
}

module.exports = { idValidate }