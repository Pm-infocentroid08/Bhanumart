const Productlist = [
    {
        id:1,
        image:'https://t4.ftcdn.net/jpg/02/14/30/43/360_F_214304332_IcxCpPJtslqgGA37MyPqXmTXI5I1aCxj.jpg',
        name:'Mango',
        price:800,
        offer:'25% Off',
        rating:'4.3',
        quant:'1 kg',
        discountPrice:600,
        brand:'hapus',
        about:'Mango is one of the most popular fruit in india.',
        specification:'Seasonal Fruit. Good for health.',
        uses:'for drink or juice'
    },
    {
        id:2,
        image:'https://previews.123rf.com/images/buriy/buriy1201/buriy120100037/11877863-delicious-red-apple-with-a-leaf-on-a-white-background.jpg',
        name:"Apple",
        offer:'15% Off',
        rating:'4.3',
        price:190,
        quant:'1 kg',
        discountPrice:161.5,
        brand:'Star',
        about:'Mango is one of the most popular fruit in india.',
        specification:'Seasonal Fruit. Good for health.',
        uses:'for drink or juice'
    },
    {
        id:3,
        image:'https://media.istockphoto.com/photos/crinkle-cut-potato-chips-in-bowl-isolated-on-white-background-picture-id1135322537',
        name:'Chips',
        offer:'10% Off',
        rating:'4.3',
        price:10,
        quant:'100 g Pouch',
        discountPrice:9,
        brand:'Lays',
        about:'Mango is one of the most popular fruit in india.',
        specification:'Seasonal Fruit. Good for health.',
        uses:'for drink or juice'
    },
];

export const getProducts = () => {
    return Productlist;
}