# Entity Relation Diagram

---

```mermaid
  erDiagram
    %%USERS ||--|{ STRATEGIES : have%%
    USERS ||--|{ GAMES : have
    USERS {  
    int user_id_PK
    string username
    string img_URL
    }
    
    STRATEGIES ||--|{ METRICS : contain
    STRATEGIES {  
    int strat_id_PK
    int user_id_FK
    DATETIME strat_dt
    string strat_name
    strat_obj strat
    }  
    
    METRICS {  
    int metric_id_PK
    int user_id_FK
    int game_id_FK
    DATETIME metric_dt
    metric_obj metric 
    }
    
    METRICS }|--|| GAMES : have  
    STRATEGIES ||--|{ GAMES : have
    GAMES {
    int game_id_PK
    int user_id_FK
    int strat_id_FK
    DATETIME game_dt  
    game_obj game
    } 
 ```