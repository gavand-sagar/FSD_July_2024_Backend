

let count = 0;

export const getCount = (req, res) => {
    res.json({
        count: count
    })
};

export const increment = (req, res) => {
    count = count + 1;
    res.json({
        count: count
    })
}

export const decrement = (req, res) => {
    count = count - 1;
    res.json({
        count: count
    })
}