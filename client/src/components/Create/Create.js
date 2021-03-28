import style from "./Create.module.css";


const Create = () => {
    return (
        <section className={style.create}>
            <form action="#" method="post">
                <fieldset>
                    <legend>Add new Offer</legend>
                    <p>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Name"/>
                    </p>
                    
                    <p>
                        <label htmlFor="price">Price</label>
                        <input type="text" name="price" id="price" placeholder="Price"/>
                    </p>
                    <p>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" placeholder="Description" cols="30" rows="10"></textarea>
                    </p>
                    <p>
                        <label htmlFor="image">Image</label>
                        <input type="text" name="image" id="image" placeholder="Image"/>
                    </p>
                    <p>
                        <label htmlFor="type">Type</label>
                        <select name="type" id="type">
                            <option value="Holidays">Holidays</option>
                            <option value="Beauty">Beauty</option>
                            <option value="Restoransts">Restoransts</option>
                            <option value="Others">Others</option>
                        </select>
                    </p>
                    <input type="submit" name="addOffer" id="addOffer" value="Add Offer" />
                    
                </fieldset>
            </form>
        </section>
    );
};

export default Create;