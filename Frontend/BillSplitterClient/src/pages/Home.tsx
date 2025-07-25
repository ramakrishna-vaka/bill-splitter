function Home(){
return (
    <div className="container">
        <h1 className="text-center my-4">Welcome to Bill Splitter</h1>
        <p className="text-center">This is a simple application to help you split bills with friends.</p>
        <div className="text-center">
        <a href="/create-bill" className="btn btn-primary mx-2">Create Bill</a>
        <a href="/view-bills" className="btn btn-secondary mx-2">View Bills</a>
        </div>
    </div>
)
}
export default Home;