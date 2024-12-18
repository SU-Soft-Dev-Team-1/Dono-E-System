export type Item = {
    username: string;
    id: string;
    name: string;
    model: string;
    type: string;
    brand: string;
    weight: number;
    images: string[];
    video: string | null;
    sellerIdPhoto: string;
    height: number;
    status: string;
    description: string;
    isListed: boolean;  
    isSold: boolean;
    isCart: boolean;
}