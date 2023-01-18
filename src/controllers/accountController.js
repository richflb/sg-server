
const account = (req, res) => {

    res.send(`Hello ${req.cookies.jwt}`);
}

module.exports = { account };