// All 84 instruments from data-center, grouped by category
export const instruments = [
  // ─── US Rates ───
  { id: "us_sofr", name: "US SOFR Yield", category: "US Rates", schedule: "daily" },
  { id: "us_iorb", name: "US IORB Yield", category: "US Rates", schedule: "daily" },
  { id: "us_3m_yield", name: "US 3M T-Bill Yield", category: "US Rates", schedule: "intraday" },
  { id: "us_2y_yield", name: "2Y UST Yield", category: "US Rates", schedule: "intraday" },
  { id: "us_5y_yield", name: "5Y UST Yield", category: "US Rates", schedule: "intraday" },
  { id: "us_10y_yield", name: "10Y UST Yield", category: "US Rates", schedule: "intraday" },
  { id: "us_30y_yield", name: "30Y UST Yield", category: "US Rates", schedule: "intraday" },

  // ─── Global & Spreads ───
  { id: "japan_10y_yield", name: "Japan 10Y Yield", category: "Global & Spreads", schedule: "daily" },
  { id: "germany_10y_yield", name: "Germany 10Y Yield", category: "Global & Spreads", schedule: "daily" },
  { id: "uk_10y_yield", name: "UK 10Y Yield", category: "Global & Spreads", schedule: "daily" },
  { id: "china_10y_yield", name: "China 10Y Yield", category: "Global & Spreads", schedule: "daily" },
  { id: "us_2s10s_spread", name: "US 2s10s Spread (bps)", category: "Global & Spreads", schedule: "daily" },
  { id: "us_5s30s_spread", name: "US 5s30s Spread (bps)", category: "Global & Spreads", schedule: "daily" },
  { id: "us_real_yield_10y", name: "US Real Yield 10Y (TIPS)", category: "Global & Spreads", schedule: "daily" },

  // ─── FX & Dollar ───
  { id: "dxy", name: "DXY Index", category: "FX & Dollar", schedule: "intraday" },
  { id: "usdjpy", name: "USDJPY Rate", category: "FX & Dollar", schedule: "intraday" },
  { id: "eurusd", name: "EURUSD Rate", category: "FX & Dollar", schedule: "intraday" },
  { id: "gbpusd", name: "GBPUSD Rate", category: "FX & Dollar", schedule: "intraday" },
  { id: "usdcnh", name: "USDCNH Rate", category: "FX & Dollar", schedule: "intraday" },
  { id: "usdchf", name: "USDCHF Rate", category: "FX & Dollar", schedule: "intraday" },
  { id: "btcusd", name: "BTCUSD Price", category: "FX & Dollar", schedule: "intraday" },

  // ─── Commodities & Vol ───
  { id: "gold", name: "Gold (XAU) Price", category: "Commodities & Vol", schedule: "intraday" },
  { id: "brent_oil", name: "Brent Oil Price", category: "Commodities & Vol", schedule: "intraday" },
  { id: "copper", name: "Copper Price", category: "Commodities & Vol", schedule: "intraday" },
  { id: "wti_oil", name: "WTI Oil Price", category: "Commodities & Vol", schedule: "intraday" },
  { id: "natural_gas", name: "Natural Gas Price", category: "Commodities & Vol", schedule: "intraday" },
  { id: "vix", name: "VIX Index", category: "Commodities & Vol", schedule: "intraday" },
  { id: "move_index", name: "MOVE Index", category: "Commodities & Vol", schedule: "intraday" },

  // ─── Econ Charts ───
  { id: "initial_jobless_claims", name: "US Initial Jobless Claims", category: "Econ Charts", schedule: "weekly" },
  { id: "continuing_jobless_claims", name: "US Continuing Jobless Claims", category: "Econ Charts", schedule: "weekly" },
  { id: "nfp", name: "US Non-Farm Payrolls", category: "Econ Charts", schedule: "monthly" },
  { id: "unemployment_rate", name: "US Unemployment Rate", category: "Econ Charts", schedule: "monthly" },
  { id: "jolts_openings", name: "US Job Openings (JOLTS)", category: "Econ Charts", schedule: "monthly" },
  { id: "jolts_quits", name: "US Job Quits (JOLTS)", category: "Econ Charts", schedule: "monthly" },
  { id: "jolts_hires", name: "US Job Hires (JOLTS)", category: "Econ Charts", schedule: "monthly" },
  { id: "ism_services_total", name: "US ISM Services PMI", category: "Econ Charts", schedule: "monthly" },
  { id: "ism_services_prices", name: "US ISM Services Prices", category: "Econ Charts", schedule: "monthly" },
  { id: "ism_services_new_orders", name: "US ISM Services New Orders", category: "Econ Charts", schedule: "monthly" },
  { id: "ism_services_employment", name: "US ISM Services Employment", category: "Econ Charts", schedule: "monthly" },
  { id: "ism_manufacturing_production", name: "US ISM Mfg Production", category: "Econ Charts", schedule: "monthly" },
  { id: "ism_manufacturing_supplier_deliveries", name: "US ISM Mfg Supplier Deliveries", category: "Econ Charts", schedule: "monthly" },
  { id: "ism_manufacturing_inventories", name: "US ISM Mfg Inventories", category: "Econ Charts", schedule: "monthly" },
  { id: "ism_manufacturing_pmi", name: "US ISM Manufacturing PMI", category: "Econ Charts", schedule: "monthly" },
  { id: "ism_manufacturing_prices", name: "US ISM Mfg Prices", category: "Econ Charts", schedule: "monthly" },
  { id: "ism_manufacturing_new_orders", name: "US ISM Mfg New Orders", category: "Econ Charts", schedule: "monthly" },
  { id: "ism_manufacturing_employment", name: "US ISM Mfg Employment", category: "Econ Charts", schedule: "monthly" },
  { id: "gdp", name: "US GDP", category: "Econ Charts", schedule: "quarterly" },
  { id: "gdpnow", name: "US Atlanta Fed GDPNow", category: "Econ Charts", schedule: "daily" },
  { id: "core_cpi", name: "US Core CPI", category: "Econ Charts", schedule: "monthly" },
  { id: "cpi", name: "US CPI", category: "Econ Charts", schedule: "monthly" },
  { id: "core_ppi", name: "US Core PPI", category: "Econ Charts", schedule: "monthly" },
  { id: "pce", name: "US PCE Price Index", category: "Econ Charts", schedule: "monthly" },
  { id: "core_pce", name: "US Core PCE Price Index", category: "Econ Charts", schedule: "monthly" },
  { id: "michigan_sentiment", name: "US Michigan Consumer Sentiment", category: "Econ Charts", schedule: "monthly" },
  { id: "consumer_confidence", name: "US Consumer Confidence", category: "Econ Charts", schedule: "monthly" },
  { id: "retail_sales", name: "US Retail Sales", category: "Econ Charts", schedule: "monthly" },
  { id: "retail_sales_core", name: "US Retail Sales Core Group", category: "Econ Charts", schedule: "monthly" },
  { id: "m2_money_supply", name: "US M2 Money Supply", category: "Econ Charts", schedule: "monthly" },
  { id: "industrial_production", name: "US Industrial Production", category: "Econ Charts", schedule: "monthly" },
  { id: "durable_goods", name: "US Durable Goods Orders", category: "Econ Charts", schedule: "monthly" },
  { id: "housing_starts", name: "US Housing Starts", category: "Econ Charts", schedule: "monthly" },
  { id: "building_permits", name: "US Building Permits", category: "Econ Charts", schedule: "monthly" },
  { id: "fed_funds_rate", name: "US Fed Funds Effective Rate", category: "Econ Charts", schedule: "daily" },

  // ─── Derived Rate-of-Change ───
  { id: "cpi_mom", name: "US CPI MoM %", category: "Econ Charts", schedule: "monthly" },
  { id: "cpi_yoy", name: "US CPI YoY %", category: "Econ Charts", schedule: "monthly" },
  { id: "core_cpi_mom", name: "US Core CPI MoM %", category: "Econ Charts", schedule: "monthly" },
  { id: "core_cpi_yoy", name: "US Core CPI YoY %", category: "Econ Charts", schedule: "monthly" },
  { id: "pce_mom", name: "US PCE MoM %", category: "Econ Charts", schedule: "monthly" },
  { id: "pce_yoy", name: "US PCE YoY %", category: "Econ Charts", schedule: "monthly" },
  { id: "core_pce_mom", name: "US Core PCE MoM %", category: "Econ Charts", schedule: "monthly" },
  { id: "core_pce_yoy", name: "US Core PCE YoY %", category: "Econ Charts", schedule: "monthly" },
  { id: "gdp_qoq_ann", name: "US GDP QoQ % (Annualized)", category: "Econ Charts", schedule: "quarterly" },
  { id: "gdp_qoq", name: "US GDP QoQ %", category: "Econ Charts", schedule: "quarterly" },
  { id: "retail_sales_mom", name: "US Retail Sales MoM %", category: "Econ Charts", schedule: "monthly" },
  { id: "retail_sales_yoy", name: "US Retail Sales YoY %", category: "Econ Charts", schedule: "monthly" },
  { id: "nfp_mom_change", name: "US NFP MoM Change", category: "Econ Charts", schedule: "monthly" },
  { id: "nfp_yoy_change", name: "US NFP YoY Change", category: "Econ Charts", schedule: "monthly" },
  { id: "durable_goods_mom_change", name: "US Durable Goods MoM Change", category: "Econ Charts", schedule: "monthly" },
  { id: "durable_goods_yoy_change", name: "US Durable Goods YoY Change", category: "Econ Charts", schedule: "monthly" },

  // ─── Watchlist ───
  { id: "sp500", name: "S&P 500 Index", category: "Watchlist", schedule: "intraday" },
  { id: "nasdaq", name: "NASDAQ Composite", category: "Watchlist", schedule: "intraday" },
  { id: "usdt_mcap", name: "USDT Market Cap", category: "Watchlist", schedule: "intraday" },
  { id: "usdc_mcap", name: "USDC Market Cap", category: "Watchlist", schedule: "intraday" },
  { id: "btc_gold_ratio", name: "BTC/Gold Ratio", category: "Watchlist", schedule: "daily" },
];

export const categories = [
  "US Rates",
  "Global & Spreads",
  "FX & Dollar",
  "Commodities & Vol",
  "Econ Charts",
  "Watchlist",
];

// Instruments that should render as candlestick charts
export const intradayIds = new Set(
  instruments.filter(i => i.schedule === "intraday").map(i => i.id)
);
