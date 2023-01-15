function ShortingResult({ lastResult } ) {

    const link = window.location.hostname;

    const href = <div className="result-block">
        Your link: <a href={"/"+lastResult}>{link + "/" + lastResult}</a>
    </div>;

    return (
        <div className="result">
            {
                lastResult.length > 0 ? href : ''
            }
        </div>
    );
}

export default ShortingResult;
