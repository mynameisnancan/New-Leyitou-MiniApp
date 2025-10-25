// 应用全局配置
const config = {
	baseUrl: 'https://api.idoutech.com/gateway',
	timeout:20000,
	appKey:'app_core',
	clientId:'e5cd7e4891bf95d1d19206ce24a7b32e',
	publicKey:'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKoR8mX0rGKLqzcWmOzbfj64K8ZIgOdHnzkXSOVOZbFu/TJhZ7rFAN+eaGkl3C4buccQd/EjEsj9ir7ijT7h96MCAwEAAQ==',
	privateKey:'MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAmc3CuPiGL/LcIIm7zryCEIbl1SPzBkr75E2VMtxegyZ1lYRD+7TZGAPkvIsBcaMs6Nsy0L78n2qh+lIZMpLH8wIDAQABAkEAk82Mhz0tlv6IVCyIcw/s3f0E+WLmtPFyR9/WtV3Y5aaejUkU60JpX4m5xNR2VaqOLTZAYjW8Wy0aXr3zYIhhQQIhAMfqR9oFdYw1J9SsNc+CrhugAvKTi0+BF6VoL6psWhvbAiEAxPPNTmrkmrXwdm/pQQu3UOQmc2vCZ5tiKpW10CgJi8kCIFGkL6utxw93Ncj4exE/gPLvKcT+1Emnoox+O9kRXss5AiAMtYLJDaLEzPrAWcZeeSgSIzbL+ecokmFKSDDcRske6QIgSMkHedwND1olF8vlKsJUGK3BcdtM8w4Xq7BpSBwsloE=',
    sse:true,
	// 应用信息
    appInfo: {
     // 应用名称
     name: "idou-op",
     // 应用版本
     version: "1.1.0",
     // 应用logo
     logo: "",
     // 官方网站
     site_url: "",
     // 政策协议
     // agreements: [{
     //     title: "隐私政策",
     //     url: "https://ruoyi.vip/protocol.html"
     //   },
     //   {
     //     title: "用户服务协议",
     //     url: "https://ruoyi.vip/protocol.html"
     //   }
     // ]
   }
 }
 
 export default config