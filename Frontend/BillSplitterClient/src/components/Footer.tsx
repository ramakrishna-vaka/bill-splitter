const Footer = () => {
            return (
                <footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h5 className="logo mb-3">SplitWise Pro</h5>
                                <p className="mb-3">The ultimate bill splitting solution for modern teams and friends.</p>
                                <div>
                                    <a href="#" className="text-white me-3"><i className="fab fa-twitter"></i></a>
                                    <a href="#" className="text-white me-3"><i className="fab fa-facebook"></i></a>
                                    <a href="#" className="text-white me-3"><i className="fab fa-instagram"></i></a>
                                    <a href="#" className="text-white"><i className="fab fa-linkedin"></i></a>
                                </div>
                            </div>
                            <div className="col-md-6 text-md-end">
                                <p className="mb-1">&copy; 2025 SplitWise Pro. All rights reserved.</p>
                                <p className="text-muted">Made with ❤️ for seamless bill splitting</p>
                            </div>
                        </div>
                    </div>
                </footer>
            );
        };
export default Footer;